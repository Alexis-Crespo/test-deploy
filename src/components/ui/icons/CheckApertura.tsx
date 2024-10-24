export default function CheckApertura({ fillColor = 'none', strokeColor = 'currentColor' }) {
    return (
        <svg width="20" height="20" viewBox="0 0 16 16" fill={fillColor} xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_2484_13565)">
                <path 
                    d="M14.6673 7.38735V8.00068C14.6665 9.4383 14.201 10.8371 13.3402 11.9886C12.4794 13.14 11.2695 13.9823 9.89089 14.39C8.51227 14.7976 7.03882 14.7486 5.6903 14.2504C4.34177 13.7522 3.19042 12.8314 2.40796 11.6254C1.6255 10.4194 1.25385 8.99273 1.34844 7.55823C1.44303 6.12373 1.99879 4.75823 2.93284 3.6654C3.86689 2.57256 5.12917 1.81094 6.53144 1.49411C7.93371 1.17729 9.40083 1.32224 10.714 1.90735M14.6671 2.66692L8.00048 9.34025L6.00048 7.34025"
                    stroke={strokeColor}
                    strokeWidth="1.33402"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_2484_13565">
                    <rect width="16" height="16" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}
