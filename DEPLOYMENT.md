# Deployment

- The app was deployed to [Render](https://render.com/).
- The database was deployed to [ElephantSQL](https://www.elephantsql.com/).

- The app can be reached by the [link](https://driveready.onrender.com/).

---

---

## Render Deployment (Backend)

### Create Database on ElephantSQL

1. Go to [ElephantSQL](https://www.elephantsql.com/) and create a new account.

2. Create a new instance of the database.

   - ![ElephantSQL. Create a new instance](documentaion/deployment/elephantsql_create_new_instance.png)

3. Select a name for your database and select the free plan.

   - ![ElephantSQL. Select a name for your database](documentaion/deployment/elephantsql_name.png)

4. Select a region close to you.

   - ![ElephantSQL. Select a region](documentaion/deployment/elephantsql_select_region.png)

5. Click "Review"

   - ![ElephantSQL. Review](documentaion/deployment/elephantsql_click_review.png)

6. Click "Create Instance"

   - ![ElephantSQL. Create Instance](documentaion/deployment/elephantsql_click_create_instance.png)

7. Click on the name of your database to open the dashboard.

   - ![ElephantSQL. Open dashboard](documentaion/deployment/elephantsql_click_db_name.png)

8. You will see the dashboard of your database. You will need the URL of your database to connect it to your Django project.

   - ![ElephantSQL. DB](documentaion/deployment/elephantsql_db_url.png)

### Create a new app on Render

1.  Create a new Render account if you don't already have one here [Render](https://render.com/).

2.  Create a new application on the following page here [New Render App](https://dashboard.render.com/), choose **Webserver**:

    - ![New Render App](documentaion/deployment/render_new_web_service.png)

3.  Search for the repository you created and click "Connect."

4.  Create name for the application

    - ![Create Application Name](documentaion/deployment/render_create_name.png)

5.  Select the region where you want to deploy the application.

    - ![Select Region](documentaion/deployment/render_select_region.png)

6.  Select branch to deploy.

    - ![Select Branch](documentaion/deployment/render_select_branch.png)

7.  Select environment.

    - ![Select Environment Variables](documentaion/deployment/render_select_environment.png)

8.  Render build command: `./build.sh`

    - ![Render Build Command](documentaion/deployment/render_build_command.png)

9.  Select Free plan.

    - ![Select Free Plan](documentaion/deployment/render_payment_info.png)

10. Click on "Advanced" settings.

11. Add the following environment variables:

    | Key                   | Value              |
    | --------------------- | ------------------ |
    | WEB_CONCURRENCY       | 4                  |
    | DATABASE_URL          | **\*\***\***\*\*** |
    | SECRET_KEY            | **\*\***\***\*\*** |
    | DEBUG                 | False              |
    | DISABLE_COLLECTSTATIC | 1                  |

    DATABASE_URL value is takes from ElephantSQL dashboard, SECRET_KEY value is takes from your local env.py file.

12. Open VS Code and create a new file called `build.sh` in the root directory of your project.

13. Copy the following code into the `build.sh` file:

    ```bash
      set -o errexit
      pip install -r requirements.txt
      python manage.py collectstatic --noinput
      python manage.py makemigrations && python manage.py migrate
    ```

    -_pip install -r requirements.txt installs the packages detailed in your requirements.txt file._

    - _python manage.py collectstatic collects all static files to allow them to be served in the production environment._
    - _The –noinput flag allows the command to run with no additional input from the deploying developer._
    - _python manage.py makemigrations && python manage.py migrate are run to ensure all migrations are made to your production database._

14. Save the file `build.sh`.

15. Go to `settings.py` file and add the following code to add Render.com to allowed hosts:

    ```python
        RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
        if RENDER_EXTERNAL_HOSTNAME:
            ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)
    ```

16. Save the file `settings.py`.

17. Go to `env.py` and change to DATEBASE_URL value to the one you got from ElephantSQL.

    ```python
        os.environ["DATABASE_URL"] = '*************'
    ```

18. Create a superuser for your database.

    ```bash
        python manage.py createsuperuser
    ```

19. Commit and push the changes to GitHub.

20. Go back to Render and click "Create Web Service."

    - ![Save Web Service](documentaion/deployment/render_create_web_service.png)

21. Wait for the completion of the deployment.

22. Go to admin panel and change the settings for the admin by assigning a role of `Boss` to allow the full control of the website including role assignment.

---

## Firebase Deployment (Frontend)

1. Go to [Firebase](https://firebase.google.com/) and create a new account.

2. Create a new project:

   - ![New Firebase Project](documentaion/deployment/firebase_create_project.png)

3. Name your project

4. Add an app to your project by clicking on Web button

   - ![New Firebase App](documentaion/deployment/firebase_choose_web.png)

5. Name and register the app

   - ![Register Firebase App](documentaion/deployment/firebase_add_web.png)

6. Install firebase package by running `npm install firebase` in the directory

7. Create a file for the config and paste the data for the app

   - ![Firebase Config file](documentaion/deployment/firebase_config_file.png)

8. Install firebase tools by running `npm install firebase-tools` in the directory

9. Build your app by running `npm run build`.

10. Initialize Firebase by running `firebase init` in the directory.

11. Deploy the app by running `firebase deploy`
