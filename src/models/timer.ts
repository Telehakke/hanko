export default class Timer {
    private static timerId: number | undefined = undefined;

    static run = (action: () => void, timeout: number = 300): void => {
        if (this.timerId != null) {
            clearInterval(this.timerId);
        }

        action();
        this.timerId = window.setInterval(() => {
            action();
        }, timeout);
    };

    static reset = (): void => {
        clearInterval(this.timerId);
    };
}
