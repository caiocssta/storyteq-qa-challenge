import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./BasePage";

export class CalendarPage extends BasePage {
    readonly page: Page
    readonly datePickerRangeInput: Locator
    readonly leftMonthDiv: Locator
    readonly nextMonthBtn: Locator
    readonly prevMonthBtn: Locator
    readonly leftMonthLabel: Locator
    readonly dateSpan: Locator
    readonly applyBtn: Locator

    constructor (page: Page) {
        super(page)
        this.page = page
        this.datePickerRangeInput = this.page.locator('#range-date-calendar')
        this.leftMonthDiv = this.page.locator('.drp-calendar.left')
        this.nextMonthBtn = this.page.locator('.next.available')
        this.prevMonthBtn = this.page.locator('.prev.available')
        this.leftMonthLabel = this.page.locator('.month').nth(0)
        this.dateSpan = this.page.locator('.drp-selected')
        this.applyBtn = this.page.locator('button').getByText('Apply')
    }

    async open () {
        await this.page.goto('/calendar')
    }

    // Click on date picker input
    async openDatePicker () {
        await this.datePickerRangeInput.click()
    }

    // Get current month displayed on the left panel
    async getCurrentLeftMonth () {
        return await this.leftMonthLabel.innerText();
    }

    // Click on the right arrow to navigate to the next month
    async goToNextMonth () {
        await this.nextMonthBtn.click()
    }

    // Click on the left arrow to navigate to the previous month
    async goToPreviousMonth () {
        await this.prevMonthBtn.click()
    }

    // Click Apply to set selected date range
    async applyDate () {
        await this.applyBtn.click()
    }

    // Navigate through month pages and select the day on the left panel month
    async selectDate (date: Date) {
        const currentDate: string = this.dateHelper(date).monthAndYear()
        const currentDay: string = this.dateHelper(date).getDay().toString()

        while (await this.getCurrentLeftMonth() !== currentDate) {
            const leftMonth = await this.getCurrentLeftMonth()

            const displayedDate = new Date("1, " + leftMonth)
            const currentDateFormatted = new Date("1, " + currentDate)

            if (currentDateFormatted > displayedDate) {
                await this.goToNextMonth()
            } else {
                // This part is unlikely to be reachable but is a good practice
                await this.goToPreviousMonth()
            }
        }

        await this.leftMonthDiv.locator('td:text("' + currentDay + '"):not(.off.ends.available)').click()
    }

    // Validate input value for applied dates
    async validateDisplayedDate (initialDate: Date, finalDate: Date) {
        const initialDateFormatted = this.dateHelper(initialDate).formatDateMMDDYYYY()
        const finalDateFormatted = this.dateHelper(finalDate).formatDateMMDDYYYY()

        const formattedString = initialDateFormatted + " - " + finalDateFormatted

        await expect(this.datePickerRangeInput).toHaveValue(formattedString)
    }

    // Data helper function
    dateHelper (date?: Date, daysInAdvance?: number) {
        if (!date)
            date = new Date()

        if (daysInAdvance !== undefined) {
            date.setDate(date.getDate() + daysInAdvance); // Add or subtract days
        }

        return {
            getDay: () => date.getDate(), // return current day of the month (e.g. 24)
            getMonth: () => date.toLocaleString('en-US', {month: 'short'}), // return current month in MMM format
            getYear: () => date.getFullYear(), // return current year
            monthAndYear: function () { // return month and year MMM YYYY
                return `${ this.getMonth() } ${ this.getYear() }`;
            },
            formatDate: function () { // return formatted date
                return this.getYear() + "-" + this.getDay() + "-" + (date.getMonth() + 1)
            },
            formatDateMMDDYYYY: function () { // return formatted date in MMddYYYY
                return (date.getMonth() + 1) + "/" + this.getDay() + "/" + this.getYear()
            },
            getDate: () => date // return date object
        }
    }
}