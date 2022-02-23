import { Router, RouterMode } from '../src/index';

const router = new Router({
  mode: RouterMode.history,
  root: '/',
});

router
  .add(/about/, () => console.log('about page'))
  .add(/product\/(\d+)/, (id: number) => console.log(`product: ${id}`))
  .add('', () => console.log('catch all controller'));

window.setTimeout(() => router.navigate('product/43'), 1000);
