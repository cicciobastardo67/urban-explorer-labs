export default function BrandMark({ className = "", title = "Urban Explorer Labs" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 112 92"
      role="img"
      aria-label={title}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 86H22V56H34V74H45V31H57V55H69V8H82V67H92V47H104V86H5Z"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
