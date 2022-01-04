import browserify from 'browserify';
import { YargsArgs } from '../../types/yargs';
import { createBundleStream, closeBundleStream } from './bundleUtils';

/**
 * Builds a Snap bundle JSON file from its JavaScript source.
 *
 * @param src - The source file path
 * @param dest - The destination file path
 * @param argv - arguments as an object generated by yargs
 * @param argv.sourceMaps - Whether to output sourcemaps
 * @param argv.stripComments - Whether to remove comments from code
 */
export function bundle(
  src: string,
  dest: string,
  argv: YargsArgs,
): Promise<boolean> {
  const { sourceMaps: debug } = argv;

  return new Promise((resolve, _reject) => {
    const bundleStream = createBundleStream(dest);
    browserify(src, { debug })
      .transform('babelify', {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                browsers: ['chrome >= 66', 'firefox >= 68'],
              },
            },
          ],
        ],
        plugins: [
          '@babel/plugin-transform-runtime',
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-proposal-optional-chaining',
          '@babel/plugin-proposal-nullish-coalescing-operator',
        ],
      })
      .bundle(
        async (bundleError, bundleBuffer: Buffer) =>
          await closeBundleStream({
            bundleError,
            bundleBuffer,
            bundleStream,
            src,
            dest,
            resolve,
            argv,
          }),
      );
  });
}
