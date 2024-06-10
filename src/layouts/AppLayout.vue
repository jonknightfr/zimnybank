<template>
    <v-card>
        <v-layout>
            <AppBar />
            <NavBar />
            <v-main style="min-height:100vh; margin:20px;">
                <router-view></router-view>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script>
  import AppBar from '@/components/AppBar.vue'
  import NavBar from '@/components/NavBar.vue'

export default {
    components: { AppBar, NavBar }
}
</script>
