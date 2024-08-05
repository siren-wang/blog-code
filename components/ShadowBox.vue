<template>
    <div class="shadow-box" ref="shadowBox"></div>
</template>

<script>
export default {
    name: 'ShadowBox',
    mounted() {
        const status = +window.localStorage.getItem('mode');
        if (status === 1) {
            const shadowBox = this.$refs.shadowBox;
    
            document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            shadowBox.style.transform = `translate(${clientX - 100}px, ${clientY - 100}px)`;
            shadowBox.style.background = `radial-gradient(600px at 1228px 660px, rgba(29, 78, 216, 0.15), transparent 80%)`
            shadowBox.style.boxShadow = `10px 10px 30px rgba(0, 0, 0, 0.3)`;
            });
    
            document.addEventListener('mouseleave', () => {
            shadowBox.style.boxShadow = 'none';
            })
        }
    }
}
</script>

<style scoped>
.shadow-box {
    width: 200px;
    height: 200px;
    background-color: #fff;
    position: absolute;
    transition: box-shadow 0.3s ease, transform 0.1s ease;
}
</style>

<style lang="stylus">
.shadow-box
    width: 200px;
    height: 200px;
    background-color: #fff;
    position: absolute;
    transition: box-shadow 0.3s ease, transform 0.1s ease;
  
</style>