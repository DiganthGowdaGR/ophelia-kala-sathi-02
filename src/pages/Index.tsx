const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-4xl">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe 
            src="https://drive.google.com/file/d/1Hqekwb0nyghArF2YJYdHuLF9g__Jg_jl/preview"
            className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl"
            allow="autoplay"
            allowFullScreen
            title="Platform Demo Video"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
