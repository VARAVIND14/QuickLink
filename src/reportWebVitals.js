const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);//Calculates Cumulative Layout Shift (CLS), which measures visual stability.
      getFID(onPerfEntry);//Measures First Input Delay (FID), which tracks the time between the user's first interaction and the browser's response.
      getFCP(onPerfEntry);//Measures First Contentful Paint (FCP), which indicates when the first piece of content is painted on the screen.
      getLCP(onPerfEntry);//Measures Largest Contentful Paint (LCP), which tracks when the largest visible content element is painted on the screen.
      getTTFB(onPerfEntry);//Measures Time to First Byte (TTFB), which indicates how long it takes for the browser to receive the first byte of data after a request.
    });
  }
};

export default reportWebVitals;
