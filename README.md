<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![Next][Next.js]][Next-url]
[![React][React.js]][React-url]
[![TypeScript][TypeScript.com]][TypeScript-url]
[![Tailwind][Tailwind.com]][Tailwind-url]
[![Supabase][Supabase.com]][Supabase-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">TeamsDash — Calendar & Team Manager</h3>

  <p align="center">
    A team and event management dashboard with a custom-built calendar, authentication, and scheduling system — powered by Schedule-X and Supabase.
    <br />
    <br />
    <a href="#getting-started">Getting Started</a>
    &middot;
    <a href="#roadmap">Roadmap</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

TeamsDash is a team and event management dashboard with a fully custom calendar UI, a team attendance tracker, and a Supabase-backed auth and data layer.

Key highlights:

- **Custom calendar** — Schedule-X powers the grid, but the toolbar, view switcher, and event modal are built from scratch to match a Figma design system, bypassing the default Schedule-X header entirely.
- **Team management** — Create and manage team members with roles, locations, contact info, and personal calendar colors. Filter the calendar by employee.
- **Authentication** — Email/password login via Supabase Auth with server-side session handling and protected routes using Next.js middleware.
- **Real-time data** — Events and employees are persisted in Supabase and loaded via server actions on every route visit.

> **Figma Design** — [View the design file](https://www.figma.com/proto/B3qUBQQagWosQrCS6vFGMe/Team-Management-Admin-Dashboard?node-id=232-3324&t=DG20VoMZFgioZcuW-1)

Built as a hands-on project after finishing a frontend course — the goal was to practice working with a non-trivial third-party library (Schedule-X), React Context, form validation, Supabase integration, and component composition in a realistic dashboard setting.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![TypeScript][TypeScript.com]][TypeScript-url]
- [![Tailwind][Tailwind.com]][Tailwind-url]
- [![Supabase][Supabase.com]][Supabase-url]
- [Schedule-X](https://schedule-x.dev/) — calendar engine
- [shadcn/ui](https://ui.shadcn.com/) — UI component primitives
- [react-hook-form](https://react-hook-form.com/) + [Zod](https://zod.dev/) — form state and validation
- [Sonner](https://sonner.emilkowal.ski/) — toast notifications
- [Lucide React](https://lucide.dev/) — icons
- [date-fns](https://date-fns.org/) — date formatting
- [Temporal Polyfill](https://github.com/js-temporal/temporal-polyfill) — date/time handling

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- Node.js 18+ and npm
  ```sh
  npm install npm@latest -g
  ```
- A [Supabase](https://supabase.com) project with the `employees` and `tasks` tables set up.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username/dash_board_noerredal.git
   ```
2. Install dependencies
   ```sh
   npm install
   ```
3. Create a `.env.local` file in the root and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Run the development server
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE -->

## Usage

- **Login** — Authenticate with an email and password stored in Supabase Auth.
- **Calendar** — Switch between Day, Week, and Month views. Create events with a title, date range, start/end time, and an assigned employee. Quick-add via the `+` button on any month grid day.
- **Team** — Add, edit, and remove team members. Each member has a role, location, contact info, and a unique calendar color. Toggle employee visibility directly from the calendar sidebar.

### Demo credentials

| Field    | Value                    |
| -------- | ------------------------ |
| Email    | `admin@teamcalendar.dev` |
| Password | `Portfolio2026!`         |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DOCUMENTATION -->

## Documentation

Full project documentation — folder structure, components and setup guide — is available at the docs site.

> **docs.page** — [View Documentation](https://docs.page/sleiterr/dash_board_noerredal)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Custom calendar toolbar — prev/next, Today, Daily/Weekly/Monthly views
- [x] "New Event" modal — title, date range, start/end time, employee assignment
- [x] Team management — add/edit/delete members with role, location, color
- [x] Shared form field components — `FormInput`, `FormSelect`, `FormDatePicker`, `FormColorPicker`
- [x] Event stats widget — today / this week counts
- [x] Supabase integration — employees and events persisted in the database
- [x] Employee–event linking — assign a person and color to each event
- [x] Sidebar mini-calendar with event dot indicators
- [x] Authentication — email/password login with Supabase Auth and protected routes
- [x] Quick-add `+` button on month grid day cells
- [x] Edit / delete flows for events directly from the calendar
- [ ] Dark mode

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Personal learning project — no license specified.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Portfolio: [olegtr.netlify.app](https://olegtr.netlify.app/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- PROJECT LINK -->

## Project Link

[https://dash-board-noerredal.vercel.app/](https://dash-board-noerredal.vercel.app/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Schedule-X docs](https://schedule-x.dev/)
- [Supabase docs](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Img Shields](https://shields.io)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript.com]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Tailwind.com]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Supabase.com]: https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white
[Supabase-url]: https://supabase.com/
