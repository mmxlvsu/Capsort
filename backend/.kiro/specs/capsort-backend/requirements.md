# Requirements Document

## Introduction

Capsort is a Capstone Collection website backend that enables students to browse, search, and save capstone projects. The system provides a RESTful API with authentication, project management, and user favorites functionality. It supports role-based access control with admin and student roles, allowing admins to manage projects while students can browse and save their favorite projects.

## Requirements

### Requirement 1

**User Story:** As a student, I want to register for an account, so that I can access the platform and save my favorite projects.

#### Acceptance Criteria

1. WHEN a user submits valid registration data (fullName, contactNumber, email, password) THEN the system SHALL create a new user account with hashed password
2. WHEN a user attempts to register with an existing email THEN the system SHALL return a 400 error with appropriate message
3. WHEN a user submits invalid registration data THEN the system SHALL return validation errors with specific field requirements
4. WHEN a user successfully registers THEN the system SHALL return a 201 status with user data (excluding password)

### Requirement 2

**User Story:** As a registered user, I want to login to my account, so that I can access protected features of the platform.

#### Acceptance Criteria

1. WHEN a user submits valid login credentials THEN the system SHALL return a JWT token with 7-day expiration
2. WHEN a user submits invalid credentials THEN the system SHALL return a 401 error
3. WHEN a user logs in successfully THEN the system SHALL return user information and JWT token
4. WHEN a JWT token is generated THEN it SHALL include user ID and role information

### Requirement 3

**User Story:** As a logged-in user, I want to access my profile information, so that I can verify my account details.

#### Acceptance Criteria

1. WHEN a user requests profile information with valid JWT token THEN the system SHALL return current user data
2. WHEN a user requests profile information without token THEN the system SHALL return 401 unauthorized
3. WHEN a user requests profile information with invalid token THEN the system SHALL return 401 unauthorized
4. WHEN user data is returned THEN the password field SHALL be excluded from response

### Requirement 4

**User Story:** As any visitor, I want to browse all capstone projects, so that I can discover interesting work from students.

#### Acceptance Criteria

1. WHEN a user requests all projects THEN the system SHALL return projects ordered by creation date (newest first)
2. WHEN a user applies field filter THEN the system SHALL return only projects matching the specified field
3. WHEN a user applies year filter THEN the system SHALL return only projects from the specified year
4. WHEN a user applies search query THEN the system SHALL return projects matching title or author
5. WHEN projects are returned THEN each project SHALL include uploader information

### Requirement 5

**User Story:** As any visitor, I want to view detailed information about a specific project, so that I can learn more about it.

#### Acceptance Criteria

1. WHEN a user requests a project by valid ID THEN the system SHALL return complete project details with uploader information
2. WHEN a user requests a project by invalid ID THEN the system SHALL return 404 not found
3. WHEN project details are returned THEN they SHALL include all project fields and uploader data

### Requirement 6

**User Story:** As an admin, I want to create new capstone projects, so that I can add content to the platform.

#### Acceptance Criteria

1. WHEN an admin submits valid project data THEN the system SHALL create a new project with admin as uploader
2. WHEN a non-admin attempts to create a project THEN the system SHALL return 403 forbidden
3. WHEN invalid project data is submitted THEN the system SHALL return validation errors
4. WHEN a project is created successfully THEN the system SHALL return 201 status with project data

### Requirement 7

**User Story:** As an admin, I want to update existing projects, so that I can maintain accurate information.

#### Acceptance Criteria

1. WHEN an admin updates a project with valid data THEN the system SHALL save changes and return updated project
2. WHEN a non-admin attempts to update a project THEN the system SHALL return 403 forbidden
3. WHEN an admin attempts to update non-existent project THEN the system SHALL return 404 not found
4. WHEN invalid update data is provided THEN the system SHALL return validation errors

### Requirement 8

**User Story:** As an admin, I want to delete projects, so that I can remove outdated or inappropriate content.

#### Acceptance Criteria

1. WHEN an admin deletes an existing project THEN the system SHALL remove the project and return 200 status
2. WHEN a non-admin attempts to delete a project THEN the system SHALL return 403 forbidden
3. WHEN an admin attempts to delete non-existent project THEN the system SHALL return 404 not found
4. WHEN a project is deleted THEN all associated saved project records SHALL be removed

### Requirement 9

**User Story:** As a student, I want to save projects to my favorites, so that I can easily find them later.

#### Acceptance Criteria

1. WHEN a student saves an existing project THEN the system SHALL create a saved project record
2. WHEN a student attempts to save the same project twice THEN the system SHALL return 400 error
3. WHEN a student saves a non-existent project THEN the system SHALL return 404 not found
4. WHEN a project is saved successfully THEN the system SHALL return 201 status

### Requirement 10

**User Story:** As a student, I want to view my saved projects, so that I can access my favorite capstone projects.

#### Acceptance Criteria

1. WHEN a student requests saved projects THEN the system SHALL return all their saved projects with full project details
2. WHEN a non-authenticated user requests saved projects THEN the system SHALL return 401 unauthorized
3. WHEN saved projects are returned THEN each SHALL include complete project information and uploader data
4. WHEN a student has no saved projects THEN the system SHALL return empty array

### Requirement 11

**User Story:** As a student, I want to remove projects from my saved list, so that I can manage my favorites.

#### Acceptance Criteria

1. WHEN a student removes a saved project THEN the system SHALL delete the saved project record
2. WHEN a student attempts to remove non-saved project THEN the system SHALL return 404 not found
3. WHEN a project is removed successfully THEN the system SHALL return 200 status
4. WHEN a non-authenticated user attempts to remove saved project THEN the system SHALL return 401 unauthorized

### Requirement 12

**User Story:** As a system administrator, I want all passwords to be securely hashed, so that user credentials are protected.

#### Acceptance Criteria

1. WHEN a user password is stored THEN it SHALL be hashed using bcryptjs
2. WHEN a user logs in THEN the system SHALL compare hashed passwords
3. WHEN password data is returned THEN the password field SHALL never be included
4. WHEN password hashing fails THEN the system SHALL return appropriate error

### Requirement 13

**User Story:** As a system administrator, I want proper error handling throughout the API, so that users receive meaningful feedback.

#### Acceptance Criteria

1. WHEN any database operation fails THEN the system SHALL return 500 internal server error
2. WHEN validation fails THEN the system SHALL return 400 bad request with specific field errors
3. WHEN authentication fails THEN the system SHALL return 401 unauthorized
4. WHEN authorization fails THEN the system SHALL return 403 forbidden
5. WHEN resources are not found THEN the system SHALL return 404 not found