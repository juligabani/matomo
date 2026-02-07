# Quick Stats – Take-Home Documentation

## How the solution works

- **How the button gets on the page**  
  The Live plugin uses a Matomo hook (`Template.pageFooter`) to display Quick Stats button in footer. 

- **How the Vue part starts**  
  When the page loads, Matomo finds that HTML and starts the Quick Stats Vue component with the site ID.
- 
- **What you see**  
  The component shows a “Quick Stats” button. Clicking it opens a modal. The modal fetches data from API and shows the numbers.
- 
- **Where the numbers come from**  
  When the modal opens, the component calls the existing **Live.getCounters** API with the site ID and “last 120 minutes”. The API returns the four metrics.


---

## Key architectural or design decisions

- **Why it lives in the Live plugin**  
  The feature uses `Live.getCounters` and is about live visitor data, so it belongs in the Live plugin. 

- **When the button is shown**  
  The button only appears when a siteId is present and visitor log is enabled. right now siteId is hard-coded. should make it dynamic.

---

## What I would improve or extend if I had more time

- **Make site id dynamic**
  Right now site id is static, should make it dynamic by understanding existing code.

- **Let the user pick the time range**  
  Add a dropdown (e.g. last 30 min, 60 min) and pass the chosen value to `Live.getCounters` as `lastMinutes`.

- **Apply standard style for UI**
  Use material UI or existing classes and pattern to keep consistency for styling instead of write own style.

- **Check for permission**
  Apply permission check (or other checks) on display Quick Stats button if it's required.

- **Check why Live.getCounters method append some extra params**
  I have used existing method to call `Live.getCounters` API which is already exist. need to check why it's append extra params.

- **Unit tests for the Vue component**  
  Add Jest + Vue Test Utils tests. It's required to install test-utils package.

- **Integration test for the footer hook**  
  A PHP test that triggers `Template.pageFooter` and checks that the Quick Stats `vue-entry` is in the output.

I have added more details about testing in Live/vue/docs/TESTING.md file.