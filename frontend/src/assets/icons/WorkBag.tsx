import { ComponentProps } from "react";


export default function WorkBag({ width = 48, height = 48, ...props }: ComponentProps<"svg">) {
    return (
        <svg width={width} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M34.0322 13.464V10.008C34.0322 6.50396 31.2002 3.62396 27.6482 3.62396H20.3042C16.8002 3.62396 13.9202 6.50396 13.9202 10.008V13.464H17.1842V10.008C17.1842 8.27996 18.5282 6.93596 20.2562 6.93596H27.6482C29.3762 6.93596 30.7202 8.27996 30.7202 10.008V13.464H34.0322Z" fill="url(#paint0_linear_459_3673)" />
            <path d="M46.7522 22.344C43.3442 23.832 35.2802 27.288 29.1362 28.872V31.56C29.1362 32.808 28.1282 33.816 26.8802 33.816H21.0722C19.8242 33.816 18.8162 32.808 18.8162 31.56V28.872C12.6722 27.288 4.6082 23.832 1.2002 22.344V39.336C1.2002 42.12 3.4562 44.376 6.2402 44.376H41.7602C44.5442 44.376 46.8002 42.12 46.8002 39.336V22.344H46.7522Z" fill="url(#paint1_linear_459_3673)" />
            <path d="M18.8162 25.752C18.8162 24.504 19.8242 23.496 21.0722 23.496H26.8802C28.1282 23.496 29.1362 24.504 29.1362 25.752V26.664C35.5682 24.888 44.3522 21 46.7522 19.944V18.024C46.7522 15.24 44.4962 12.984 41.7122 12.984H6.24019C3.45619 12.984 1.2002 15.24 1.2002 18.024V19.944C3.6002 21 12.3842 24.84 18.8162 26.664V25.752Z" fill="url(#paint2_linear_459_3673)" />
            <path d="M21.0722 25.656C21.0242 25.656 21.0242 25.704 21.0242 25.704V31.512C21.0242 31.56 21.0722 31.56 21.0722 31.56H26.8802C26.9282 31.56 26.9282 31.512 26.9282 31.512V25.752C26.9282 25.704 26.8802 25.704 26.8802 25.704H21.0722V25.656Z" fill="url(#paint3_linear_459_3673)" />
            <defs>
                <linearGradient id="paint0_linear_459_3673" x1="24.0002" y1="3.62396" x2="24.0002" y2="44.376" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFA57B" />
                    <stop offset="1" stopColor="#F5773B" />
                </linearGradient>
                <linearGradient id="paint1_linear_459_3673" x1="24.0002" y1="3.62396" x2="24.0002" y2="44.376" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFA57B" />
                    <stop offset="1" stopColor="#F5773B" />
                </linearGradient>
                <linearGradient id="paint2_linear_459_3673" x1="24.0002" y1="3.62396" x2="24.0002" y2="44.376" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFA57B" />
                    <stop offset="1" stopColor="#F5773B" />
                </linearGradient>
                <linearGradient id="paint3_linear_459_3673" x1="24.0002" y1="3.62396" x2="24.0002" y2="44.376" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFA57B" />
                    <stop offset="1" stopColor="#F5773B" />
                </linearGradient>
            </defs>
        </svg>

    );
}