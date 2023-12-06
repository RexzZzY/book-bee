import { handlebars } from 'hbs';

export default function registerHandlebarHelpers() {
  handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });

  handlebars.registerHelper('times', function (n, options) {
    let accum = '';
    for (let i = 0; i < n; ++i) accum += options.fn(i);
    return accum;
  });

  handlebars.registerHelper('for', function (from, to, incr, options) {
    let accum = '';
    for (let i = from; i < to; i += incr) accum += options.fn(i);
    return accum;
  });

  handlebars.registerHelper(
    'paginate',
    function (currentPage, totalPage, options) {
      let accum = '';
      const limit = 5;

      const startIndex = currentPage - limit < 0 ? 1 : currentPage - limit;
      const endIndex =
        currentPage + limit > totalPage ? totalPage : currentPage + limit;

      if (startIndex > 1) {
        accum += options.fn({ data: '...', isCurrentPage: false });
      }

      for (let index = startIndex; index <= endIndex; index++) {
        if (index == currentPage) {
          accum += options.fn({ data: index, isCurrentPage: true });
          continue;
        }
        accum += options.fn({ data: index, isCurrentPage: false });
      }

      if (endIndex < totalPage) {
        accum += options.fn({ data: '...', isCurrentPage: false });
      }

      return accum;
    },
  );

  handlebars.registerHelper(
    'paginate-direction',
    (currentPage, totalPage, type, options) => {
      if (type == 'PREVIOUS') {
        if (currentPage - 1 < 1) {
          return options.fn({ data: currentPage, isDisabled: true });
        } else {
          return options.fn({ data: currentPage - 1, isDisabled: false });
        }
      }

      if (type == 'NEXT') {
        if (currentPage + 1 > totalPage) {
          return options.fn({ data: totalPage, isDisabled: true });
        } else {
          return options.fn({ data: currentPage + 1, isDisabled: false });
        }
      }
    },
  );
}
