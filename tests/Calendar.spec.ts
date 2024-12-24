import test from "@playwright/test";
import {CalendarPage} from "../pages/CalendarPage";

test.describe('Validate Date Picker functionalities', () => {
    var calendarPage: CalendarPage
    test.beforeEach(async ({page}) => {
        calendarPage = new CalendarPage(page)
        await calendarPage.open()
    })

    test('Select 3 days range', async () => {

        const currentDate = calendarPage.dateHelper() // current date
        const secondDate = calendarPage.dateHelper(currentDate.getDate(), 5) // current date + 5

        // Click to open date picker
        await calendarPage.openDatePicker()

        // Select current date
        await calendarPage.selectDate(currentDate.getDate())

        // Select a date 5 days in the future
        await calendarPage.selectDate(secondDate.getDate())

        // Apply selected date range
        await calendarPage.applyDate()

        // Validate that the datepicker input contains correct value
        await calendarPage.validateDisplayedDate(currentDate.getDate(), secondDate.getDate())
    })
})