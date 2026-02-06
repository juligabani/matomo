/*!
 * Matomo - free/libre analytics platform
 *
 * UI screenshot tests for the Quick Stats modal.
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

describe("QuickStats", function () {
    this.fixture = "Piwik\\Plugins\\Live\\tests\\Fixtures\\VisitsWithAllActionsAndDevices";

    it("should show Quick Stats modal with counters", async function () {
        await page.goto("?module=CoreHome&action=index&idSite=1&period=day&date=yesterday");

        await page.waitForNetworkIdle();
        await page.waitForSelector(".quick-stats-footer button", { timeout: 10000 });

        await page.click(".quick-stats-footer button");

        await page.waitForSelector(".modal.open", { visible: true, timeout: 5000 });
        await page.waitForSelector(".quick-stats-content", { visible: true, timeout: 5000 });
        await page.waitForNetworkIdle();

        await page.mouse.move(-10, -10);

        // Screenshot the entire modal (title, period text, table, close button)
        var modal = await page.$(".modal.open");
        expect(await modal.screenshot()).to.matchImage("quick_stats_modal");
    });
});
