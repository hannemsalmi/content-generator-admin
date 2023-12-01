import { LightningElement, track } from 'lwc';

export default class SystemMessageUpdater extends LightningElement {
    @track systemMessage = 'Default system message';

    handleSystemMessageChange(event) {
        this.systemMessage = event.target.value;
    }

    async sendSystemMessageToBackend() {
        try {
            await fetch('https://marketing-content-generator-02c05e08f82e.herokuapp.com/adminsettings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    systemMessage: this.systemMessage,
                }),
            });
        } catch (error) {
            console.error('Error sending system message:', error);

        }
    }
}
