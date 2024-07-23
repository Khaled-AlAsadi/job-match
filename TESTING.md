# TESTING

## Manual Testing

Testing was done throughout site development, for each feature before it was merged into the master file.

Usability was tested with the below user acceptance testing, sent to new users to ensure testing from different users, on different devices and browsers to ensure issues were caught and where possible fixed during development.

| Page       | User Actions                                              | Expected Results                            | Y/N | Comments |
| ---------- | --------------------------------------------------------- | ------------------------------------------- | --- | -------- |
| Sign Up    |                                                           |                                             |     |          |
| 1          | Click on Sign Up button                                   | Redirection to Sign Up page                 | Y   |          |
| 2          | Click on the Login link                                   | Redirection to Login page                   | Y   |          |
| 3          | Enter valid email                                         | Field will only accept email address format | Y   |          |
| 4          | Sign In                                                   | Redirects user to home page                 | Y   |          |
| 5          | Click "Logout" button                                     | Redirects user to login page                | Y   |          |
| 6          | Click browser back button                                 | You are still logged out                    | Y   |          |
| Log In     |                                                           |                                             |     |          |
| 1          | Click on Log In button                                    | Redirection to Log In page                  | Y   |          |
| 2          | Click on the Sign Up link in the form                     | Redirection to Sign Up page                 | Y   |          |
| 3          | Enter valid email                                         | Field will only accept email address format | Y   |          |
| 4          | Click login button with valid form                        | Redirects user to home page                 | Y   |          |
| 5          | Click logout button                                       | Redirects user to login page                | Y   |          |
| 6          | Click browser back button                                 | You are still logged out                    | Y   |          |
| 7          | Enter valid email                                         | Field will only accept email address format | Y   |          |
| Navigation |                                                           |                                             |     |          |
| 1          | Click Github button                                       | Redirection to new tab with github link     | Y   |          |
| 2          | Click Logout button                                       | Redirection to login page                   | Y   |          |
| Employer   |                                                           |                                             |     |          |
| 1          | Click View post                                           | Redirection to Job Page                     | Y   |          |
| 2          | Click View Application                                    | Redirection to Application page             | Y   |          |
| 3          | Click Add post                                            | Modal appears                               | Y   |          |
| 4          | Save with valid format                                    | Request happens and data is saved           | Y   |          |
| 5          | Save with invalid format                                  | Validation appears                          | Y   |          |
| Employee   |                                                           |                                             |     |          |
| 1          | Click Profile                                             | Redirection to Profile Page                 | Y   |          |
| 2          | Click Add work experince / Add Education                  | Modal opens                                 | Y   |          |
| 3          | Click Save work experince / Education with valid format   | Request happens and data is saved           | Y   |          |
| 4          | Click Save work experince / Education with invalid format | Validation appears                          | Y   |          |
| 5          | Click Delete work experince / Education                   | Modal appears                               | Y   |          |
| 6          | Click Delete in modal                                     | Request happens and data is removed         | Y   |          |

---

## Testing User Story

| Employer                                                                                   | Requirement met | Image                                                             |
| ------------------------------------------------------------------------------------------ | --------------- | ----------------------------------------------------------------- |
| As an employer i want to be able to create Job Posts for interessted candidates to apply.  | Y               | ![Signup Page](documentation/features/allauth_access/sign_up.png) |
| As an employer i want to be able to delete my Job Post                                     | Y               | ![Home Page](documentation/features/home/home_page.png)           |
| As an employer i want to be able to edit my existing Job                                   | Y               | ![Home Page](documentation/features/home/home_page.png)           |
| As an employer i want to be able to view the candidates profiles that applied for the job. | Y               | ![Home Page](documentation/features/home/home_page.png)           |

| Employee                                                                         | Requirement met | Image |
| -------------------------------------------------------------------------------- | --------------- | ----- |
| As an employee i want to be able to view published Job Posts and apply for them. | Y               |       |
| As an employee i want to be able to update my cv/profile.                        | Y               |       |
| As an employee i want to be able to create my cv/profile to apply with.          | Y               |       |

---

## Bugs

**Solved bugs:**

1. I was getting logged out after 5 minutes from the app.

_Solution:_

Increased the lifetime of the jwt `SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(minutes=60),
}
`.

2. Request happening when the user is employer when it should only happen when user is employee.

_Solution:_

Add check to see if the user is an employee `if (user?.is_ag === false) {
        try {
          const data = await retrieveAvailableJobPosts(authTokens?.access);
          setJobPosts(data);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }`.

---

### HTML Validation:

### CSS Validation:

### JS Validation:

### Python Validation:

- No errors were found when the code was passed through Valentin Bryukhanov's [online validation tool](http://pep8online.com/). According to the reports, the code is [Pep 8-compliant](https://legacy.python.org/dev/peps/pep-0008/). This checking was done manually by copying python code and pasting it into the validator.

- [JobMatchApp. Validation Report](documentaion/validation/pep8_validation_app.pdf)

---

## Lighthouse Report

LightHouse is a web performance testing tool that can be used to evaluate the performance of a website. The report is generated by Google Chrome.

[Lighthouse Report](documentaion/testing/lighthouse_report.pdf)

---

## Compatibility

Testing was conducted on the following browsers;

- Brave;
- Chrome;

[Compatibility Report](documentaion/validation/compatibility.pdf)

---

## Responsiveness

The responsiveness was checked manually by using devtools (Chrome) throughout the whole development. It was also checked with [Responsive Viewer](https://chrome.google.com/webstore/detail/responsive-viewer/inmopeiepgfljkpkidclfgbgbmfcennb/related?hl=en) Chrome extension.

[Responsiveness Report](documentaion/testing/responsiveness.pdf)

---
