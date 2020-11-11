<template>
    <div>
        <TheHeader title="カムトル"/>
        <main>
            <router-view/>
        </main>
    </div>
</template>

<style>
* {
    box-sizing: border-box;
}

html {
    font-family: 'Kosugi Maru', sans-serif;
}

body {
    margin: 0;
    background-color: #f7f2e9;
}
</style>