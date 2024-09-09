# Features

## Access to pages according to the user role:

| Page Name       | Logged out | Employee | Employer |
| --------------- | ---------- | -------- | -------- |
| Home            | No         | Yes      | Yes      |
| Profile         | No         | Yes      | No       |
| MyJobPosts      | No         | Yes      | No       |
| JobPage         | No         | No       | Yes      |
| ApplicationPage | No         | No       | Yes      |
| Profile         | Yes        | No       | No       |
| MyJobPosts      | Yes        | No       | No       |
| JobPage         | Yes        | No       | No       |
| ApplicationPage | Yes        | No       | No       |

## Main Features:

- Each page has a navbar and a footer

### Navbar:

- ##### Navigation

  - Contains navigation links :

    - HOME - leads to the home page.
    - Log in/out - leads to the login page.
    - Profile (Employee only) - leads to the profile page.
    - Job applications (Employee only) - leads to the applications page.

  - The links have animated hover effect.
  - The navigation is clear and easy to understand for the user.
    ![NavBar desktop Employee](documentaion/features/header_employee.png)

  - The navigation bar is responsive:

    - On mobile devices:

      ![NavBar Mobile Closed](documentaion/features/header_employee_closed.png)

      - When the hamburger menu is clicked, there is dropdown menu with the available links.
        ![NavBar Mobile Open](documentaion/features/header_employee_open.png)

### Home Page (Employer):

![Home page](documentaion/features/home_page_employer.png)

The Home Page is for the employer to create/view the jobposts.

The Home Page has:

- Button that opens the form for the employer to create a job post.

### Job Page (Employer):

![Job page](documentaion/features/job_page_employer.png)

The Page is for the employer to create/view the jobposts.
The Job Page has:

- Go back button that takes the user to the home page.
- Delete Button that opens the delete modal.
- Edit button that opens the form with the form filled and ready to edit.

### Create Job Post Modal (Employer):

![Create Job Post Form](documentaion/features/job_post_form_employer.png)

The Modal is for the employer to create/view the jobposts.

The Modal has

- Form
- Cnacel Button
- Save Button

### Delte Job Post Modal (Employer):

![Delete Job Post Modal](documentaion/features/job_delete_modal_employer.png)

The Modal is for the employer to confirm deletion of a jobpost.

The Modal has

- Title
- Subtitle
- Cnacel Button
- Save Button

### Application Page (Employer):

![Application Page employer](documentaion/features/application_page_employer.png)

The Application Page is for the employer to view a specifc candidate's CV that applied for the job.

---

### Home Page (Employee):

![Home page](documentaion/features/home_page_employee.png)

The page is for the employee/Jobseeker to view available jobs and apply for them.

### Prfoile Page (Employee)

![Profile page](documentaion/features/profile_page_employee.png)

The page is for the employee/Jobseeker to view available jobs and apply for them.

The page has:

- Cards for Job Posts.
- Skip button.
- Apply Button.

### Applications Page (Employee)

![Applications page](documentaion/features/applications_page_employee.png)

The page is for the employee/Jobseeker to view which job posts the jobseeker already applied for.

The page has:

- Cards for Job Posts.
- Delete button for every Job Post.

---

### Component Overview

This section outlines the key components of the system, detailing their responsibilities and how they are designed for reusability.

| Component       | Description                                                   | Role                                                         | Reusability                                                                                                     |
| --------------- | ------------------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| Modal           | A customizable modal component for delete actions in the app. | Handles deletion.                                            | Accepts props for different titles, text, and button text, making it reusable across different parts of the UI. |
| Button          | A customizable button component.                              | Reusable button                                              | Accepts props for different button variants and styles.                                                         |
| Auth Context    | Handles user authentication and session management.           | Controls login, logout, and user session validation.         | Can be integrated anywhere in the app where user authentication is required.                                    |
| Loading Spinner | Loading spinner that can be used on buttons                   | Shows on login button when user tries to log in              | Can be integrated anywhere in the app on button click and waits a response.                                     |
| Experince Form  | Form for creating and editing Educations and Work Experinces  | Manages adding new or editing educations and work experinces | The form is used for the job seeker to add new or edit existing experinces.                                     |

### API Routes

#### Job Seeker

| **Feature**                              | **Method** | **Endpoint**                                     | **Description**                                         | **Request Body**                                                                                                     | **Response**                                                                                                                                                                           | **Authentication** |
| ---------------------------------------- | ---------- | ------------------------------------------------ | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **Login**                                | POST       | `/login`                                         | Authenticates user and returns JWT token.               | `{ "username": "string", "password": "string" }`                                                                     | `{ "access": "jwt_token", "refresh":"refresh token" }`                                                                                                                                 | None               |
| **Sign up**                              | POST       | `/create/user`                                   | Creates an account for user.                            | `{ "email": "string", "first_name": "string", "password":"string", "mobile_number":"string", "last_name":"string" }` | `{ "email": "string", "first_name": "string", "password":"string", "mobile_number":"string", "last_name":"string" , "org_number":"string", "is_ag":"boolean", "is_active":"boolean" }` | None               |
| **Applications**                         | GET        | `/jobseeker/applications`                        | Retrieves the jobs that the JobSeeker applied for.      | None                                                                                                                 | `{ "id": "Integer", job_post }`                                                                                                                                                        | Bearer "token"     |
| **Profile**                              | GET        | `/jobseeker/retrieve/profile`                    | Retrieves the JobSeeker profile.                        | None                                                                                                                 | `{ profile }`                                                                                                                                                                          | Bearer "token"     |
| **Retrieve Available JobPosts**          | GET        | `/jobseeker/availableJobPosts`                   | Retrieves the published job posts.                      | None                                                                                                                 | None                                                                                                                                                                                   | Bearer "token"     |
| **Retrieve Filtered Available JobPosts** | GET        | `/jobseeker/availableJobPosts?location={string}` | Retrieves the published job posts filtered by location. | None                                                                                                                 | None                                                                                                                                                                                   | Bearer "token"     |
| **Update Profile**                       | PATCH      | `/jobseeker/info/update`                         | Updates JobSeeker info.                                 | `{ "mobile_number": "string", "email":"string" }`                                                                    | `{ "mobile_number": "string", "email":"string" }`                                                                                                                                      | Bearer "token"     |
| **Delete Work Experience**               | DELETE     | `/jobseeker/workexperience/delete/{id}`          | Deletes a work experience entry.                        | None                                                                                                                 | None                                                                                                                                                                                   | Bearer "token"     |
| **Create Work Experience**               | POST       | `/jobseeker/workexperience/create`               | Creates a new work experience entry.                    | `{ workexperience }`                                                                                                 | `{ workexperience }`                                                                                                                                                                   | Bearer "token"     |
| **Update Work Experience**               | PUT        | `/jobseeker/workexperience/update/{id}`          | Updates an existing work experience entry.              | `{ workexperience }`                                                                                                 | `{ workexperience }`                                                                                                                                                                   | Bearer "token"     |
| **Delete Education**                     | DELETE     | `/jobseeker/education/delete/{id}`               | Deletes an education entry.                             | None                                                                                                                 | None                                                                                                                                                                                   | Bearer "token"     |
| **Create Education**                     | POST       | `/jobseeker/education/create`                    | Creates a new education entry.                          | `{ education }`                                                                                                      | `{ education }`                                                                                                                                                                        | Bearer "token"     |
| **Update Education**                     | PUT        | `/jobseeker/education/update/{id}`               | Updates an existing education entry.                    | `{ education }`                                                                                                      | `{ education }`                                                                                                                                                                        | Bearer "token"     |
| **Delete User**                          | DELETE     | `/jobseeker/delete/user`                         | Deletes the JobSeeker account.                          | None                                                                                                                 | `{ "message": "User deleted successfully." }`                                                                                                                                          | Bearer "token"     |

#### Employer

| **Feature**                       | **Method** | **Endpoint**                                             | **Description**                                        | **Request Body**                                                                                                                            | **Response**                                                                                                                                                                           | **Authentication** |
| --------------------------------- | ---------- | -------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **Login**                         | POST       | `/login`                                                 | Authenticates user and returns JWT token.              | `{ "username": "string", "password": "string" }`                                                                                            | `{ "access": "jwt_token", "refresh":"refresh token" }`                                                                                                                                 | None               |
| **Sign up**                       | POST       | `/create/user`                                           | Creates an account for employer.                       | `{ "email": "string", "first_name": "string", "password":"string", "mobile_number":"string", "last_name":"string", "org_number":"string" }` | `{ "email": "string", "first_name": "string", "password":"string", "mobile_number":"string", "last_name":"string" , "org_number":"string", "is_ag":"boolean", "is_active":"boolean" }` | None               |
| **Retrieve Job Posts**            | GET        | `/employer/jobposts`                                     | Retrieves the job posts that the employer created.     | None                                                                                                                                        | `[{JobPosts}]`                                                                                                                                                                         | Bearer "token"     |
| **Retrieve Job Post Application** | GET        | `/employer/jobpost/{PostId}/application/{ApplicationId}` | Retrieves the profile that applied for a specific job. | None                                                                                                                                        | `{Profile}`                                                                                                                                                                            | Bearer "token"     |
| **Delete User**                   | DELETE     | `/employer/delete/user`                                  | Deletes the Employer account.                          | None                                                                                                                                        | `{ "message": "User deleted successfully." }`                                                                                                                                          | Bearer "token"     |
