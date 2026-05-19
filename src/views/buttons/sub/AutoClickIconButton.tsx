import { useRef, type JSX, type ReactNode } from "react";

/** 長押ししている間、onClickを連続で呼び出すボタン */
export const AutoClickIconButton = (props: {
    className: string;
    onClick: () => void;
    children: ReactNode;
}): JSX.Element => {
    const timeoutId = useRef<number | undefined>(undefined);
    const intervalId = useRef<number | undefined>(undefined);

    const startRepeat = (): void => {
        props.onClick();

        window.clearTimeout(timeoutId.current);
        window.clearInterval(intervalId.current);
        timeoutId.current = window.setTimeout(() => {
            intervalId.current = window.setInterval(() => {
                props.onClick();
            }, 100);
        }, 500);
    };

    const stopRepeat = (): void => {
        window.clearTimeout(timeoutId.current);
        window.clearInterval(intervalId.current);
    };

    return (
        <button
            className={props.className}
            onTouchStart={startRepeat}
            onTouchEnd={(e) => {
                e.preventDefault();
                stopRepeat();
            }}
            onMouseDown={startRepeat}
            onMouseUp={stopRepeat}
            onMouseLeave={stopRepeat}
        >
            {props.children}
        </button>
    );
};
