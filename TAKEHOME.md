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
  The button only appears when a site is present. right now it's hard-coded. should make it dynamic.

---

## What I would improve or extend if I had more time

- **Make site id dynamic**
  Right now site id is static, should make it dynamic by understanding code.

- **Let the user pick the time range**  
  Add a dropdown or tabs (e.g. last 30 min, 2 hours, 24 hours) and pass the chosen value to `Live.getCounters` as `lastMinutes`.

- **I don't like to add inline css**
  I have added scoped style, but it's not applying so just added inline. but this needs to refactor.

- **Check why Live.getCounters method append some extra params**
  I have used existing method to call `Live.getCounters` API which is already exist. need to check why it's append extra params.

- **UI Screenshot Tests**
  Add UI Screenshot tests

- **Unit tests for the Vue component**  
  Add Jest + Vue Test Utils tests.

- **Integration test for the footer hook**  
  A PHP test that triggers `Template.pageFooter` and checks that the Quick Stats `vue-entry` is in the output.