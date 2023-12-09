import { LightningElement, track } from 'lwc';

export default class SystemMessageUpdater extends LightningElement {
    @track currentSystemMessage = 'Loading system message...';
    @track inputSystemMessage = '';

    @track currentInstagramInstruction = 'Loading...';
    @track currentLinkedinInstruction = 'Loading...';
    @track currentEmailInstruction = 'Loading...';

    @track inputInstagramInstruction = '';
    @track inputLinkedinInstruction = '';
    @track inputEmailInstruction = '';

    connectedCallback() {
        this.fetchSystemMessage();
        this.fetchInstructions();
    }

    async fetchSystemMessage() {
        try {
            const response = await fetch('https://marketing-content-generator-02c05e08f82e.herokuapp.com/get-system-message');
            const data = await response.json();
            this.currentSystemMessage = data.systemMessage;
            this.inputSystemMessage = data.systemMessage;
        } catch (error) {
            console.error('Error fetching system message:', error);
            this.currentSystemMessage = 'Error loading system message';
        }
    }

    async fetchInstructions() {
        try {
            const response = await fetch('https://marketing-content-generator-02c05e08f82e.herokuapp.com/get-instructions');
            if (response.ok) {
                const data = await response.json();
                this.currentInstagramInstruction = data.instagram;
                this.currentLinkedinInstruction = data.linkedin;
                this.currentEmailInstruction = data.email;
            } else {
                console.error('Error fetching instructions. Status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching instructions:', error);
        }
    }

    handleSystemMessageChange(event) {
        this.inputSystemMessage = event.target.value;
    }

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

    handleInstagramInstructionChange(event) {
        this.inputInstagramInstruction = event.target.value;
    }

    async updateInstagramInstruction() {
        await this.updateInstructions('instagram', this.inputInstagramInstruction);
        this.currentInstagramInstruction = this.inputInstagramInstruction;
    }

    handleLinkedinInstructionChange(event) {
        this.inputLinkedinInstruction = event.target.value;
    }

    async updateLinkedinInstruction() {
        await this.updateInstructions('linkedin', this.inputLinkedinInstruction);
        this.currentLinkedinInstruction = this.inputLinkedinInstruction;
    }

    handleEmailInstructionChange(event) {
        this.inputEmailInstruction = event.target.value;
    }

    async updateEmailInstruction() {
        await this.updateInstructions('email', this.inputEmailInstruction);
        this.currentEmailInstruction = this.inputEmailInstruction;
    }

    async fetchDefaultInstruction(contentType) {
        try {
            const response = await fetch(`https://marketing-content-generator-02c05e08f82e.herokuapp.com/get-default-instruction/${contentType}`);
            if (response.ok) {
                const data = await response.json();
                this[`current${contentType.charAt(0).toUpperCase() + contentType.slice(1)}Instruction`] = data.defaultInstruction;
                this[`input${contentType.charAt(0).toUpperCase() + contentType.slice(1)}Instruction`] = data.defaultInstruction;
                
                // Update the instructions in the backend
                await this.updateInstructions(contentType, data.defaultInstruction);
            } else {
                console.error(`Error fetching default ${contentType} instruction. Status:`, response.status);
            }
        } catch (error) {
            console.error(`Error fetching default ${contentType} instruction:`, error);
        }
    }

    async updateInstructions(contentType, instruction) {
        try {
            const instructions = { [contentType]: instruction };
            const response = await fetch('https://marketing-content-generator-02c05e08f82e.herokuapp.com/update-instructions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(instructions)
            });

            if (response.ok) {
                console.log(`Instructions for ${contentType} updated successfully`);
            } else {
                console.error(`Error updating instructions for ${contentType}. Status:`, response.status);
            }
        } catch (error) {
            console.error(`Error updating instructions for ${contentType}:`, error);
        }
    }

    async resetToDefaultInstagram() {
        await this.fetchDefaultInstruction('instagram');
    }

    async resetToDefaultLinkedin() {
        await this.fetchDefaultInstruction('linkedin');
    }

    async resetToDefaultEmail() {
        await this.fetchDefaultInstruction('email');
    }
}
