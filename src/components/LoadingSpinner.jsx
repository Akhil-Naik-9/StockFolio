const LoadingSpinner = ({ fullScreen = false }) => {
  const spinner = (
    <div className="flex items-center justify-center py-10">
      <div className="w-10 h-10 border-4 border-base-700 border-t-accent-blue rounded-full animate-spin" />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-950">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
