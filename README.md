# JobMatch

**Deployed website: [Link to website](https://job-match-web-32db5.web.app/)**

![Main image](documentaion/readme_header.png)

## About

## The application is meant to match Jobseeker and Employer. The Jobseeker has the ability to create a profile,Browse the available job and apply for them. While the employer can create job posts the employer can alson view the candidates and contact them.

## UX

The application have a standard look. The plan was to focus on the functionality and then enhance the styling more in the soon future.

---

### User Stories

#### Employer

| Issue ID                                                                                    | User Story                                                                                 |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [#1](https://github.com/users/Khaled-AlAsadi/projects/1/views/1?pane=issue&itemId=71540103) | As an employer i want to be able to create Job Posts for interessted candidates to apply.  |
| [#2](https://github.com/users/Khaled-AlAsadi/projects/1/views/1?pane=issue&itemId=71540378) | As an employer i want to be able to edit my existing Job Post                              |
| [#3](https://github.com/users/Khaled-AlAsadi/projects/1/views/1?pane=issue&itemId=71540405) | As an employer i want to be able to delete my Job Post                                     |
| [#4](https://github.com/users/Khaled-AlAsadi/projects/1/views/1?pane=issue&itemId=71540432) | As an employer i want to be able to view the candidates profiles that applied for the job. |
|                                                                                             |

#### Employee

| Issue ID                                                                                    | User Story                                                                      |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [#1](https://github.com/users/Khaled-AlAsadi/projects/1/views/1?pane=issue&itemId=71540462) | As an employee i want to be able to create my cv/profile to apply with.         |
| [#2](https://github.com/users/Khaled-AlAsadi/projects/1/views/1?pane=issue&itemId=71540489) | As an employee i want to be able to update my cv/profile.                       |
| [#3](https://github.com/users/Khaled-AlAsadi/projects/1/views/1?pane=issue&itemId=71540519) | As an employee i want to be able to view published Job Posts and apply for them |
|                                                                                             |
|                                                                                             |

---

## Future Development

### Automated Test

I plan to implement automated tests for the models and the views.

### Page Styles

Styles Enhancment across the whole app.

---

## Technologies used

- ### Languages:

  - [Python 3.8.5](https://www.python.org/downloads/release/python-385/): the primary language used to develop the server-side of the website.
  - [JS](https://www.javascript.com/): the primary language used to develop interactive components of the website.
  - [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML): the markup language used to create the website.
  - [CSS](https://developer.mozilla.org/en-US/docs/Web/css): the styling language used to style the website.

- ### Frameworks and libraries:

  - [Django](https://www.djangoproject.com/): python framework used to create all the logic.
  - [React](https://react.dev/): react framework was used to create all the frontend components.

- ### Databases:

  - [SQLite](https://www.sqlite.org/): was used as a development database.
  - [PostgreSQL](https://www.postgresql.org/): the database used to store all the data.

- ### Other tools:

  - [Git](https://git-scm.com/): the version control system used to manage the code.
  - [Pip3](https://pypi.org/project/pip/): the package manager used to install the dependencies.
  - [Gunicorn](https://gunicorn.org/): the web server used to run the website.
  - [Psycopg2](https://www.psycopg.org/): the database driver used to connect to the database.
  - [Django-allauth](https://django-allauth.readthedocs.io/en/latest/): the authentication library used to create the user accounts.
  - [Django-extensions](https://django-extensions.readthedocs.io/en/latest/) was used to create a Entity-Relationship Diagram.
  - [PEP8](https://pep8.org/): was used to validate Python code for the website.
  - [Chrome DevTools](https://developer.chrome.com/docs/devtools/open/): was used to debug the website.
  - [GitHub](https://github.com/): used to host the website's source code.
  - [VSCode](https://code.visualstudio.com/): the IDE used to develop the website.
  - [Miro](https://miro.com/): used to create the flowchart.

---

## Features

Please refer to the [FEATURES.md](FEATURES.md) file for all test-related documentation.

---

## Design

### Color Scheme

The navbar and footer has the backgroudcolor (`#333333`) which is black grey.
The delete buttons has the red backgroudcolor.
The add and confirmation buttons has light blue backgroudcolor.
The edit buttons has grey backgroudcolor.
The cards has a white background.

### Wireframes

[Wireframes](documentaion/design/wireframes.pdf)

---

## Agile Methodology

### GitHub Project Management

![GitHub Project Management](documentaion/agile/kanban.png)

---

## Flowcharts

To understand app flow, I created flowchart.

[Flowchart](documentaion/flowcharts/flow_chart.png)

---

## Information Architecture

### Database

- During the earliest stages of the project, the database was created using SQLite.
- The database was then migrated to PostgreSQL.

### Entity-Relationship Diagram

![ERD](documentaion/my_project_visualized.png)

### Data Modeling

#### CustomUser

| Name          | Database Key  | Field Type   | Validation                           |
| ------------- | ------------- | ------------ | ------------------------------------ |
| email         | email         |              | unique=True                          |
| mobile_number | mobile_number | CharField    | max_length=20                        |
| first_name    | first_name    | CharField    | max_length=30                        |
| last_name     | last_name     | CharField    | max_length=30                        |
| org_number    | org_number    | CharField    | max_length=20, blank=True, null=True |
| is_active     | is_active     | BooleanField | default=False                        |
| is_staff      | is_staff      | BooleanField | default=False                        |
| is_ag         | is_ag         | BooleanField | default=False                        |

#### JobPost

| Name            | Database Key    | Field Type      | Validation                                                         |
| --------------- | --------------- | --------------- | ------------------------------------------------------------------ |
| job_post        | job_post        | OneToOneField   | CustomUser, on_delete=models.CASCADE, related_name='job_posts'     |
| job_post_title  | job_post_title  | CharField       | max_length=50                                                      |
| company_name    | company_name    | CharField       | max_length=50,                                                     |
| location        | location        | CharField       | max_length=50,                                                     |
| employment_type | employment_type | CharField       | choices=EMPLOYMENT_TYPES, max_length=22                            |
| job_description | job_description | CharField       | max_length=1000,                                                   |
| phone_number    | role            | ForeignKey      | max_length=10,                                                     |
| expiration_date | created_at      | DateTimeField   |                                                                    |
| is_published    | updated_at      | BooleanField    | default=False                                                      |
| applications    | applications    | ManyToManyField | CustomUser, through='Application', related_name='job_applications' |

#### Application

| Name             | Database Key     | Field Type    | Validation                                                        |
| ---------------- | ---------------- | ------------- | ----------------------------------------------------------------- |
| profile_id       | profile_id       | ForeignKey    | on_delete=models.CASCADE, related_name='applications'             |
| job_post         | job_post         | ForeignKey    | JobPost,on_delete=models.CASCADE, related_name='job_applications' |
| job_seeker_cv    | job_seeker_cv    | ForeignKey    | JobSeekerCv,on_delete=models.CASCADE, related_name='applications' |
| application_date | application_date | DateTimeField | auto_now_add=True                                                 |

#### JobSeekerCv

| Name             | Database Key     | Field Type      | Validation                                                             |
| ---------------- | ---------------- | --------------- | ---------------------------------------------------------------------- |
| profile          | profile          | ForeignKey      | CustomUser,on_delete=models.CASCADE, related_name='job_seeker_profile' |
| email            | email            | EmailField      | unique=True                                                            |
| mobile_number    | mobile_number    | CharField       | max_length=30                                                          |
| applied_profiles | applied_profiles | ManyToManyField | JobPost , related_name='applicants'                                    |

#### WorkExperince

| Name             | Database Key     | Field Type | Validation                                                            |
| ---------------- | ---------------- | ---------- | --------------------------------------------------------------------- |
| job_seeker       | job_seeker       | ForeignKey | JobSeekerCv,on_delete=models.CASCADE, related_name='work_experiences' |
| occupation_title | occupation_title | CharField  | max_length=50                                                         |
| company_name     | company_name     | CharField  | max_length=50                                                         |
| years            | years            | CharField  | max_length=10                                                         |
| description      | description      | CharField  | max_length=500                                                        |

#### Education

| Name        | Database Key | Field Type | Validation                                                      |
| ----------- | ------------ | ---------- | --------------------------------------------------------------- |
| job_seeker  | job_seeker   | ForeignKey | JobSeekerCv,on_delete=models.CASCADE, related_name='educations' |
| school_name | school_name  | CharField  | max_length=50                                                   |
| level       | level        | CharField  | max_length=50                                                   |
| orientation | orientation  | CharField  | max_length=50                                                   |
| description | description  | CharField  | max_length=500                                                  |
| years       | years        | CharField  | max_length=10,null=True                                         |

---

## Testing

Please refer to the [TESTING.md](TESTING.md) file for all test-related documentation.

---

## Deployment

- The api was deployed to [Render](https://render.com/).

- The app was deployed to [Firebase](https://firebase.google.com/)

- The database was deployed to [ElephantSQL](https://www.elephantsql.com/).

- The app can be reached by the [link](https://wowder.onrender.com).

Please refer to the [DEPLOYMENT.md](DEPLOYMENT.md) file for all deployment and payment-related documentation.

---

## Credits

- [GitHub](https://github.com/) for giving the idea of the project's design.
- [Django](https://www.djangoproject.com/) for the framework.
- [Font awesome](https://fontawesome.com/): for the free access to icons.
- [Render](https://render.com/): for providing a free hosting.
- [Firebase](https://firebase.google.com/): for providing a free hosting.
- [Postgresql](https://www.postgresql.org/): for providing a free database.
- [Graphviz](https://graphviz.org/download/): for generating Picture of database model.
