import { ComponentProps } from "react";

export default function MarkerPin({ width = 20, height = 20, ...props }: ComponentProps<"svg">) {
    return (
        <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M9.99967 10.8334C11.3804 10.8334 12.4997 9.71413 12.4997 8.33341C12.4997 6.9527 11.3804 5.83341 9.99967 5.83341C8.61896 5.83341 7.49967 6.9527 7.49967 8.33341C7.49967 9.71413 8.61896 10.8334 9.99967 10.8334Z" stroke="#A3A3A3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.99967 18.3334C13.333 15.0001 16.6663 12.0153 16.6663 8.33341C16.6663 4.65152 13.6816 1.66675 9.99967 1.66675C6.31778 1.66675 3.33301 4.65152 3.33301 8.33341C3.33301 12.0153 6.66634 15.0001 9.99967 18.3334Z" stroke="#A3A3A3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}