# Testing the Quick Stats Feature

This document describes how the Quick Stats feature can test.

---

## UI Screenshot Tests

### Location
- **Spec file:** `plugins/Live/tests/UI/QuickStats_spec.js`
- **Expected screenshots:** `plugins/Live/tests/UI/expected-screenshots/`

### What the UI Test Does
- Loads a report page with `idSite=X`.
- Waits for the Quick Stats button (`.quick-stats-footer button`) to appear.
- Clicks the button to open the modal.
- Waits for the modal (`.modal.open`) and the content area (`.quick-stats-content`).
- Takes a screenshot of the modal for visual regression. Zeros are acceptable when there is no visit data.


## Unit Tests

### Location
- **Spec file:** `plugins/Live/vue/src/QuickStats/QuickStats.spec.ts`

### What Is Tested
- **Rendering:** Footer is hidden when `idSite` is null; Quick Stats button is shown when `idSite` is set.
- **Modal and API:** Clicking the button opens the modal and triggers `fetchStats()`. `AjaxHelper.fetch` is called with `method: 'Live.getCounters'`, `idSite`, and `lastMinutes: 120`.
- **Data handling:** Stats are set from an object response; when the API returns an array.
- **Error handling:** On API failure, `error` is set and loading is cleared;
- **Display states:** Displaying Stats in model

### Tooling
- **Jest** (project script: `npm test`)
- **@vue/test-utils** (`shallowMount`) — must be installed: `npm install --save-dev @vue/test-utils@^2.0.0`


### 1. Integration Tests (PHP)

**What to test:**
- `Live.php` → `renderQuickStatsButton()` is hooked to `Template.pageFooter` and appends the Quick Stats Vue entry (`vue-entry="Live.QuickStats"`, `id-site`).
- Quick Stats is **only** output when the visitor log is enabled: `renderQuickStatsButton()` returns early when `!Live::isVisitorLogEnabled($idSite)` (no Vue entry in the footer).

**Where:** e.g. `plugins/Live/tests/Integration/LiveTest.php`

**Tooling:** PHPUnit, `tests:run`