export const useDebounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      console.log(context);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 2000);
    };
  };