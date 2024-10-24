export default function GeneralInfo({ fillColor = 'white', strokeColor = 'currentColor' }) {
    return (
        <svg width="24" height="24" viewBox="0 0 16 16" fill={fillColor} xmlns="http://www.w3.org/2000/svg">
            <path 
                d="M9.33317 1.33362H3.99984C3.64622 1.33362 3.30708 1.47409 3.05703 1.72414C2.80698 1.97419 2.6665 2.31333 2.6665 2.66695V13.3336C2.6665 13.6872 2.80698 14.0264 3.05703 14.2764C3.30708 14.5265 3.64622 14.667 3.99984 14.667H11.9998C12.3535 14.667 12.6926 14.5265 12.9426 14.2764C13.1927 14.0264 13.3332 13.6872 13.3332 13.3336V5.33362M9.33317 1.33362L13.3332 5.33362M9.33317 1.33362L9.33265 5.33362L13.3332 5.33362M10.6663 8.66589H5.33301M10.6663 11.3331H5.33301M6.66704 5.99926H5.33301"
                stroke={strokeColor}
                strokeWidth="1.13402"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
