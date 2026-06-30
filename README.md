<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Next][Next.js]][Next-url]
[![React][React.js]][React-url]
[![TypeScript][TypeScript.com]][TypeScript-url]
[![Tailwind][Tailwind.com]][Tailwind-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Noerredal Dashboard Calendar</h3>

  <p align="center">
    A team and event management dashboard with a custom-built calendar and scheduling system — powered by Schedule-X.
    <br />
    <br />
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
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#architecture-notes">Architecture Notes</a></li>
    <li><a href="#known-quirks--fixes">Known Quirks & Fixes</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

Noerredal Dashboard is a team and event management dashboard built around a fully custom calendar UI. Rather than using the default Schedule-X header, the project hooks directly into Schedule-X's internal app state (`calendar.$app`) to build a bespoke toolbar, view switcher, and event modal that match a Figma design system pixel-for-pixel.

The project also includes a Team Attendance page with a person-creation flow, reusable form field components, and an event-color system that ties people/events to a consistent color identity.

This project was built as a hands-on learning exercise after finishing a frontend course — the goal was to practice working with a non-trivial third-party library (Schedule-X), React Context, form validation, and component composition in a realistic dashboard setting.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![TypeScript][TypeScript.com]][TypeScript-url]
* [![Tailwind][Tailwind.com]][Tailwind-url]
* [Schedule-X](https://schedule-x.dev/) — calendar engine (`@schedule-x/calendar`, `@schedule-x/react`)
* [Temporal Polyfill](https://github.com/js-temporal/temporal-polyfill) — date/time handling (`Temporal.PlainDate`, `Temporal.ZonedDateTime`)
* [shadcn/ui](https://ui.shadcn.com/) — Input, Select, Button, Calendar, Popover, Card primitives
* [react-hook-form](https://react-hook-form.com/) + [Zod](https://zod.dev/) — form state and schema validation
* [Headless UI](https://headlessui.com/) — accessible modal (`Dialog`, `Transition`)
* [Sonner](https://sonner.emilkowal.ski/) — toast notifications
* [date-fns](https://date-fns.org/) — date formatting in the UI layer
* [Lucide React](https://lucide.dev/) — icons

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* Node.js and npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username/dash_board_noerredal.git
   ```
2. Install dependencies
   ```sh
   npm install
   ```
3. Run the dev server
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- PROJECT STRUCTURE -->
## Project Structure

```
src/
  app/
    dashboard/
      page.tsx              # Calendar dashboard route
      team/
        page.tsx             # Team attendance route
      layout.tsx
      page.tsx  
  components/
    Calendar/
      CalendarContext.tsx    # React Context exposing the Schedule-X `calendar` instance
      CalendarProvider.tsx   # Wraps useCalendarApp(), provides events/views/plugins
      CalendarDashboard.tsx  # Renders the calendar grid + custom weekdays row
      CalendarToolbar.tsx    # Custom prev/next, Today, month/year title
      CalendarWeekdays.tsx   # Mon–Sun row, only shown in month-grid view
      sidebar-calendar.tsx.  # 
    Header/
      CalendarViewSwitcher.tsx   # Daily / Weekly / Monthly toggle
      ModalNewEvent.tsx          # "New Event" modal
      FormEvent.tsx               # New event form (title, date range, start/end time)
      DatePicker.tsx              # shadcn Calendar + Popover, range mode
      FormDatePicker.tsx          # react-hook-form wrapper around DatePicker
      FormActions.tsx             # Shared Cancel / Submit button pair
      EventStats.tsx               # "X today / Y this week" widget
      Header.tsx
      ModalNewEvent.tsx
    HeaderTeam/
      HeaderTeam.tsx          # Team page header (date, Add Person button)
      AddPersonBtn.tsx
      ModalAddPerson.tsx      # "New Person" modal, owns the form state + live preview
      FormPerson.tsx           # Person form (name, role, location, phone, email, color)
      FormInput.tsx             # Reusable react-hook-form text/email/time input
      FormSelect.tsx             # Reusable react-hook-form select
      FormColorPicker.tsx        # Calendar-color swatch picker
    Modal/
      Modal.tsx               # Headless UI Dialog wrapper used by both modals
  hooks/
    useEventStats.ts          # Computes "today" / "this week" event counts from the calendar
  lib/
    eventColors.ts            # EVENT_COLOR_DATA, COLOR_LABELS, getInitials()
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ARCHITECTURE NOTES -->
## Architecture Notes

### Shared calendar instance via Context

`useCalendarApp()` is called once, inside `CalendarProvider`, and exposed through `CalendarContext` / `useCalendar()`. Every component that needs to read or mutate calendar state (toolbar, view switcher, weekdays row, event stats) pulls the same `calendar` instance from context instead of receiving it as a prop chain — this was a deliberate refactor away from prop-drilling `calendar` through three levels of components.

### Custom toolbar instead of the default Schedule-X header

The default `.sx__calendar-header` is hidden via CSS, and a custom toolbar (`CalendarToolbar`, `CalendarViewSwitcher`) drives navigation directly through Schedule-X's internal reactive state:

```ts
calendar.$app.datePickerState.selectedDate.value = newDate; // Temporal.PlainDate
calendar.$app.calendarState.setRange(newDate);               // moves the visible range
calendar.$app.calendarState.setView(view, currentDate);       // switches Day/Week/Month
```

`calendar.$app.datePickerState.selectedDate` is a Preact signal — reading `.value` once on mount only gives a stale snapshot, so components subscribe to it:

```ts
useEffect(() => {
  const unsubscribe = calendar.$app.datePickerState.selectedDate.subscribe(setCurrentDate);
  return () => unsubscribe?.();
}, [calendar]);
```

The same pattern is used to keep `CalendarWeekdays` (which should only render in month-grid view) in sync with `calendar.$app.calendarState.view`.

### Forms: react-hook-form + Zod + shared field components

Both modals (`FormEvent`, `FormPerson`) follow the same shape:

* a Zod schema defines validation rules,
* `useForm({ resolver: zodResolver(schema), mode: "onChange" })` lives in the modal component,
* the `form` object is passed down as a prop to the form body and to `FormActions`,
* individual fields are built from shared, schema-agnostic components (`FormInput`, `FormSelect`, `FormDatePicker`, `FormColorPicker`) that each wrap a single `Controller`.

This means adding a new field to either form is just adding a key to the Zod schema + `defaultValues`, then dropping in a `<FormInput name="..." form={form} />`.

### Event colors & avatars

`lib/eventColors.ts` defines a small palette (`green`, `purple`, `blue`, `orange`, `rose`) with both Tailwind classes (`bgClass`, `avatarBg`, …) and a raw hex `accentColor` for inline styles (used for the active border on the color picker swatches). `getInitials(name)` derives a 2-letter avatar fallback from a full name, used in the "New Person" modal preview.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- KNOWN QUIRKS -->
## Known Quirks & Fixes

A few non-obvious things were discovered while integrating Schedule-X `3.7.x`:

* **`calendarState.view` is read-only** — it can only be changed via `setView(view, date)`, never by assignment.
* **`setView` / `setRange` require a `Temporal.PlainDate`**, not a string and not a `Temporal.ZonedDateTime`, even though events themselves require `Temporal.ZonedDateTime` or `Temporal.PlainDate`.
* **Multi-day timed events** (`start`/`end` spanning several calendar days) render as all-day-style bars in Day/Week view rather than a timed block — keep `start`/`end` on the same day for a normal timed event.
* **No built-in 24h `HH:mm` time-grid format** in this version — hour labels (`.sx__week-grid__hour-text`) are patched client-side to append `:00`, re-applied on every view change via a subscription to `calendar.$app.calendarState.view`.
* **shadcn `Button`/`Input` focus-visible ring** has higher specificity than custom Tailwind classes in places — `!` (Tailwind's `!important` modifier) is used where a custom focus/hover state needs to fully override the default.
* **Native `<input type="time">` placeholder** (`--:--`) cannot be reliably styled across browsers via CSS pseudo-elements without also affecting the entered value — left as a known visual limitation rather than fighting the browser further.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Custom calendar toolbar (prev/next, Today, Daily/Weekly/Monthly)
- [x] "New Event" modal with title, date range, start/end time
- [x] "New Person" modal with name, role, location, phone, email, calendar color
- [x] Shared form field components (FormInput, FormSelect, FormDatePicker, FormColorPicker, FormActions)
- [x] Event stats widget (today / this week counts)
- [ ] Supabase integration — persist people and events, replace local arrays
- [ ] Connect Team members to calendar events (assign person + color to an event)
- [ ] Sidebar mini-calendar widget synced with the main calendar (selected date + event dots)
- [ ] Edit / delete flows for events and people

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Personal learning project — no license specified.

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
