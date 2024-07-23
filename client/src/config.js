const URL =
  window.location.hostname === `localhost`
    ? `http://localhost:4040`
    : `https://treviso.vercel.app/`;

const stripeKey =
  "pk_test_51LOIMTKgWtQw6nnwLDSCYWcKo1bUXv8ilVJFBm9LXcmonoGmoxDtISOWdtZ5F9I95EyeW6LMPjASIFBfZFdnqju300oBVn7aFg";

export { URL, stripeKey };
