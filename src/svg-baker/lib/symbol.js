const { renderer } = require('../../posthtml-svg-mode');
const { getRoot } = require('./utils');
const defaultFactory = require('./symbol-factory');

class SpriteSymbol {
  constructor({ id, tree, request }) {
    this.id = id;
    this.tree = tree;
    this.request = request;
    this.usageId = `${id}-usage`;
  }

  /**
   * @param {Object} options
   * @param {string} options.id
   * @param {string} options.content
   * @param {string|FileRequest} options.request
   * @param {Function<Promise<PostHTMLProcessingResult>>} [options.factory]
   * @return {Promise<SpriteSymbol>}
   */
  static create(options) {
    const { id, request, content, factory = defaultFactory } = options;
    return factory({ id, request, content })
      .then(({ tree }) => new SpriteSymbol({ id, request, tree }));
  }

  /**
   * @return {string}
   */
  get viewBox() {
    const root = getRoot(this.tree);
    return root.attrs ? root.attrs.viewBox : null;
  }

  /**
   * @return {string}
   */
  render() {
    return renderer(this.tree);
  }
}

module.exports = SpriteSymbol;
