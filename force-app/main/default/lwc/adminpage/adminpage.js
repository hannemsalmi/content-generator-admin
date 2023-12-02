import { LightningElement, track, wire, api } from 'lwc';

export default class SystemMessageUpdater extends LightningElement {
    @track currentSystemMessage = 'Loading system message...';
    @track inputSystemMessage = '';


    // Lifecycle hook to fetch system message when the component loads
    connectedCallback() {
        this.fetchSystemMessage();
    }

    // Function to fetch the current system message from the backend
    async fetchSystemMessage() {
        try {
            const response = await fetch('https://marketing-content-generator-02c05e08f82e.herokuapp.com/get-system-message');
            const data = await response.json();
            this.currentSystemMessage = data.systemMessage; // Update the system message with the response
        } catch (error) {
            console.error('Error fetching system message:', error);
            this.currentSystemMessage = 'Error loading system message';
        }
    }

    // Function to handle changes in the system message text area
    handleSystemMessageChange(event) {
        this.inputSystemMessage = event.target.value;
    }

    // Function to send the updated system message to the backend
    async sendSystemMessageToBackend() {
        try {
            const response = await fetch('https://marketing-content-generator-02c05e08f82e.herokuapp.com/set-system-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    systemMessage: this.inputSystemMessage,
                }),
            });
    
            if (response.ok) {
                this.fetchSystemMessage();
            } else {
                console.error('Error updating system message. Status:', response.status);
            }
        } catch (error) {
            console.error('Error sending system message:', error);
        }
    }

    //Function to reset to default system message found in env variable
    async resetToDefault() {
        try {
            const response = await fetch('https://marketing-content-generator-02c05e08f82e.herokuapp.com/reset-system-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                this.fetchSystemMessage();
            } else {
                console.error('Error resetting system message. Status:', response.status);
            }
        } catch (error) {
            console.error('Error resetting system message:', error);
        }
    }
}
