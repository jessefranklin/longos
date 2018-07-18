export class StateLoader {

    
    loadState() {
        try {
            let serializedState = localStorage.getItem("name");
            if (serializedState === null) {
                return this.initializeState();
            }
            return JSON.parse(serializedState);
        }
        catch (err) {
            return this.initializeState();
        }
    }

    saveState(state) {
        try {
            let serializedState = JSON.stringify(state);
            localStorage.setItem("name", serializedState);
        }
        catch (err) {
        }
    }

    removeState(){
        try {
            localStorage.removeItem("name");
        }
        catch (err) {
        }
    }

    initializeState() {
        return {

        }
    };
}
