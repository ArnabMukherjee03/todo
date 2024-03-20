export const useDebounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      console.log(context,args);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 2000);
    };
  };