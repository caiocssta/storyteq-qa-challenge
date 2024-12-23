<h1 align="center">
  <br>
  <img src="https://marwan-prod-client-image.s3.eu-west-1.amazonaws.com/1668585287169.jpeg" alt="Storyteq B.V." width="200">
  <br>
  <br>
  Storyteq Test Automation Engineer Assessment
  <br>
  <br>
</h1>

### Playwright Coding Challenge for Test Automation Engineer

**Role**: Test Automation Engineer

---

#### Challenge Overview

As a Test Automation Engineer candidate, your challenge is to design and implement test scripts using Playwright (or Cypress if you prefer). This challenge is designed to assess your coding skills and understanding of modern test automation frameworks, fundamental test automation concepts, as well as your ability to create cleanly written and structured test cases.

This challenge should take around two hours to finish. However, spending more/less time is at your discretion. In essence, please send us automation code you are proud of).

---

#### Task Description

1. **Automation Script Requirements**:

    - **Language**: TypeScript(ideally) or JavaScript.
    - **Framework**: Playwright (ideally) or Cypress.
    - **Components**: Each component should include at least one test case to satisfy the requirements.
        - **Authentication**: User Login - https://qa-practice.netlify.app/auth_ecommerce
            - Automate the process of logging into the website with valid credentials.
            - Assert successful login by checking for a specific element or message that appears only after login.
            - Store and retrieve user credentials from an .env file.
        - **State Management /Visual Comparison**: Modify Element State in DOM and implement Visual Comparison of desired state - https://qa-practice.netlify.app/visual
            - Handle gif to reach static webpage state
            - Assert desired static state with playwright .screenshot comparison.
            - Manage the dynamic element to ensure the test is deterministic and not flaky.
        - **Datepicker**: Select multiple date range dynamic from today's date into the future (e.g. today to three days into the future)- https://qa-practice.netlify.app/calendar
            - Ensure that test selects dates starting from today's date (e.g. xx/xx/2024) into the future.
            - Assert that the interaction leads to the expected outcome (e.g. correct dates selected).
2. **Code Quality and Best Practices**:
    - Your code should be well-structured and commented.
    - Follow modern best practices for test automation where effective/efficient.

3. **Documentation**:
    - Provide a simple README file with instructions on how to set up and run your tests.

#### Evaluation Criteria

- Correctness and completeness of the implemented test cases.
- Code quality, readability, and use of modern best practices.
- Ability to cover required component scenario(s) and at least one negative path/edge case in total in your submission (any component).
- Quality and clarity of documentation.

---

If you have any questions, please reach out to us.

Good luck! We look forward to seeing your approach to this challenge.

### Getting Started
Fork this repository and clone it to your local machine.

### Prerequesites
Node.js v22+
- If you use `nvm`, run the following command to switch to the correct version:
```nvm use```

### Setup
Install the dependencies using the following command:
```npm install```

### Install Playwright Browser(s)
```npx playwright install```

### Running Playwright Locally
```npx playwright test --ui```

### Begin Challenge
Once you start the challenge, it should be finished within two days. Once you have completed it, be sure to commit all changes to your repo and add the reviewer as an admin to your repo as well.