# Car Dealer

## Project Description
Car Dealer is a full-stack web application for a used car dealership. Visitors can browse
the vehicle inventory by category, view detailed listings with specs and photos, and submit
a contact form. Registered customers can leave and manage reviews on vehicles and submit
service requests (oil changes, inspections, etc.), tracking their status over time. Employees
have a dashboard to manage inventory, moderate reviews, and handle service requests and
contact submissions. Owners have full administrative control, including managing vehicle
categories, inventory, and user roles.

## Database Schema
![Entity Relationship Diagram](docs/erd.png)

Core tables: `users` (with `role`: customer/employee/owner), `categories`, `vehicles`
(linked to `categories`), `vehicle_images` (one-to-many with `vehicles`), `reviews`
(linked to `users` and `vehicles`), `service_requests` (linked to `users`, with status
tracking), and `contact_submissions`.

## User Roles
- **Customer**: Can register/log in, browse inventory, leave/edit/delete their own reviews,
  and submit and track service requests.
- **Employee**: Everything a customer can do, plus a dashboard to edit vehicle details
  (price, description, availability, photos), moderate/delete reviews, manage service
  requests (update status, add notes), and view contact form submissions.
- **Owner**: Everything an employee can do, plus adding/editing/deleting vehicles and
  categories, and managing user roles.

## Test Account Credentials
All test accounts use the password `password123!`.

| Role     | Email               |
|----------|---------------------|
| Customer | customer@gmail.com |
| Employee | employee@gmail.com |
| Owner    | admin@gmail.com |

## Known Limitations
- No CSS styling has been applied yet — the site is functional but unstyled.
- Vehicle and gallery images are referenced by URL/path rather than uploaded as files.
- No automated test suite.