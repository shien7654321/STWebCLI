import main from './main';

const { app, router } = main();
router.isReady().then(() => {
    app.mount('#app', true);
});
