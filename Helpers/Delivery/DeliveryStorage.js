class DeliveryStorage {

    setDeliverySlot(slot_id) {
        localStorage.setItem('slot_id', slot_id);
    }

    getDeliverySlot() {
        return localStorage.getItem('slot_id');
    }

    removeDeliverySlot() {
        this.hasDeliverySlot() ? localStorage.removeItem('slot_id') : '';
    }

    hasDeliverySlot() {
        return !!this.getDeliverySlot();
    }

}

export default DeliveryStorage = new DeliveryStorage();