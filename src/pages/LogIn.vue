<script setup lang="ts">
    import {ref} from 'vue';
    import {useRouter} from 'vue-router';
    const router = useRouter();
    const email = ref('');
    const password = ref('');

    const newUsername = ref('');
    const newEmail = ref('');
    const newPassword = ref('');
    const confirmNewPassword = ref('');
    const tabName = ref('login');

    function forgotPassword(){
        
    }
    async function login(){
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email: email.value, 
                    password: password.value })
            });

            const data = await response.json();
            if(data.ok){
                alert('welcome!');
                console.log('loged in')
                await router.push('/');
            }else{
                alert('Wrong credentials.')
            }
        }
        catch (error) {
            console.error("Database connection failed", error);
        }
    };
</script>

<template>
    <q-page>
        <div class="h-screen w-full flex items-center justify-center">
            <div class="w-11/12 md:w-[40%] bg-[#E1D9BC] shadow-2 rounded-xl overflow-hidden">
                <q-tabs>
                    <q-tab name="login" @click="tabName = 'login'" label="Login"/>
                    <q-tab name="register" @click="tabName = 'register'" label="Register"/>
                </q-tabs>
                <q-separator />

                <q-tab-panels v-model="tabName" animated class="bg-transparent">
                
                    <q-tab-panel name="login" class="q-gutter-y-md q-pa-lg">
                        <q-input v-model="email" label="Email Address:" stack-label />
                        <q-input v-model="password" label="Password:" type="password" stack-label />
                        <a href="#" class="text-caption text-primary cursor-pointer" @click="forgotPassword">
                            Forgot Password?
                        </a>
                        <q-btn label="Login" class="bg-green full-width rounded-md" @click="login"/>
                    </q-tab-panel>

                    <q-tab-panel name="register" class="q-gutter-y-md q-pa-lg">
                        <q-input v-model="newUsername" label="Username:" stack-label />
                        <q-input v-model="newEmail" label="Email Address:" stack-label />
                        <q-input v-model="newPassword" label="Create Password:" type="password" stack-label />
                        <q-input v-model="confirmNewPassword" label="Confirm Password:" type="password" stack-label />
                        <q-btn label="Create Account" color="green" class="full-width" />
                    </q-tab-panel>
                </q-tab-panels>
            </div>
        </div>
    </q-page>
</template>