<template>
  <GridLayout class="modal-manager">
    <ModalContainer 
      v-for="(modal, index) in modals"
      :key="index"
      v-bind="modal.modalProps"
      :component="modal.component"
      :props="modal.props"
      @close="onClose(modal, $event)"
    />
  </GridLayout>
</template>

<script>
import ModalContainer from './ModalContainer.vue';
export default {
  name: 'ModalManager',
  components: {
    ModalContainer,
  },
  data: () => {
    return {
      modals: [],
    }
  },
  mounted() {
    this.$modalBus.on('modal:create', this.createModal);
    this.$modalBus.on('modal:close top', this.closeTop);
    this.$modalBus.onTerminate(this.closeAll);
  },
  methods: {
    createModal(comp, resolve, props, modalProps) {
      if (!comp || !resolve) {
        console.error(['ModalManager] missing component and/or resolve callback'])
      }

      const modal = {
        component: comp,
        modalProps,
        resolve,
        props
      }

      this.modals.push(modal);
    },
    onClose(modal, resp) {
      modal.resolve(resp);
      this.modals = this.modals.filter(m => m !== modal);
    },
    closeAll() {
      console.log('[ModalManger] Request to terminate all modals');
      const len = this.modals.length;

      for(let i = len - 1; i >= 0; i++) {
        this.modals[i].resolve(this.$modalBus.TERMINATE);
      }

      this.modals = [];
      console.log('[ModalManager] All modals closed')
    },
  }
}
</script>