<!--
  Matomo - free/libre analytics platform

  @link    https://matomo.org
  @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div v-if="idSite" class="quick-stats-footer">
    <button type="button" class="btn" @click="showModal = true">
      {{ translate('Live_QuickStats') }}
    </button>
    <MatomoDialog v-model="showModal" :options="{ dismissible: true }">
      <div class="ui-confirm">
        <h1>{{ translate('Live_QuickStats') }}</h1>
        <p class="quick-stats-last-minutes">{{ translate('Live_LastMinutes', lastMinutes) }}</p>

        <div v-if="isLoading">
          <MatomoLoader />
          <span>{{ translate('General_LoadingData') }}</span>
        </div>

        <div v-else-if="error" class="alert alert-danger">
          {{ error }}
        </div>

        <div v-else class="quick-stats-content">
          <table class="quick-stats-table">
            <tbody>
              <tr>
                <td> {{ translate('Live_TotalVisits') }}</td>
                <td>{{ stats?.visits || 0 }}</td>
              </tr>
              <tr>
                <td>{{ translate('Live_TotalActions') }}</td>
                <td>{{ stats?.actions || 0 }}</td>
              </tr>
              <tr>
                <td>{{ translate('Live_ColumnNbVisitors') }}</td>
                <td>{{ stats?.visitors || 0 }}</td>
              </tr>
              <tr>
                <td>{{ translate('Live_VisitsConverted') }}</td>
                <td>{{ stats?.visitsConverted || 0 }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <input type="button" :value="translate('General_Close')" role="yes" class="btn" />
      </div>
    </MatomoDialog>
  </div>
</template>
<style lang="less" scoped>

.quick-stats-footer {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
}

.quick-stats-last-minutes {
  margin: 10px 0 10px 0;
  font-size: 14px;
  color: #666;
}

.quick-stats-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 12px;

  tr {
    border-bottom: 1px solid #cccccc;
  }
  tr:last-child {
    border-bottom: none;
  }
  td {
    padding: 10px 8px 10px 0;
    vertical-align: middle;
  }
  td:last-child {
    text-align: right;
    padding-right: 0;
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { MatomoDialog, MatomoLoader, AjaxHelper } from 'CoreHome';

interface LiveCounters {
  visits: number;
  actions: number;
  visitors: number;
  visitsConverted: number;
}

interface QuickStatsState {
  showModal: boolean;
  isLoading: boolean;
  error: string | null;
  stats: LiveCounters | null;
  lastMinutes: number;
}

const LAST_MINUTES = 120; // TODO make period dynamic
export default defineComponent({
  components: {
    MatomoDialog,
    MatomoLoader,
  },
  props: {
    idSite: {
      type: Number,
      default: null,
    },
  },
  data(): QuickStatsState {
    return {
      showModal: false,
      isLoading: false,
      error: null,
      stats: null,
      lastMinutes: LAST_MINUTES,
    };
  },
  watch: {
    showModal(newVal: boolean) {
      if (newVal) {
        this.fetchStats();
      }
    },
  },
  methods: {
    async fetchStats() {
      if (!this.idSite) return;

      this.isLoading = true;
      this.error = null;
      this.stats = null;

      try {
        const data = await AjaxHelper.fetch({
          method: 'Live.getCounters',
          idSite: this.idSite,
          lastMinutes: LAST_MINUTES,
        });
        this.stats = Array.isArray(data) && data.length > 0 ? data[0] : null;
      } catch (e) {
        this.error = (e?.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>
