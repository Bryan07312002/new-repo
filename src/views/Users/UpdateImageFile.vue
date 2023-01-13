<template>
    <div class="bg-white p-6 rounded-md">
        <h2 class="font-semibold text-center pb-2">Alterar foto</h2>
        <div class="w-5/6 h-[1px] bg-[var(--gray)] m-auto" />

        <div class="p-2.5 h-[24vh] w-auto flex justify-center box-content">
            <div ref="divImage" class="flex justify-center h-full w-[24vh] min-h-0 relative rounded-sm overflow-hidden"
                @mousedown="moveImage" @wheel="zoomImage">
                <img :src='currentURL' ref="image" class='h-full w-full absolute' alt="Profile picture">
                <div class="h-full w-full bg-black z-10 opacity-20 absolute circular-mask"> </div>
            </div>
        </div>

        <file-input-vue :type="'file'" label="Selecionar arquivo" class="mt-3" @change="onFileChange" />
        <div class="w-full flex justify-between mt-5">
            <button-vue type="blue" class="w-full" @click="save()">
                Salvar
            </button-vue>
        </div>
    </div>
</template>

<script setup lang="ts">
import User from '@/api/models/user';
import FileInputVue from '@/components/FileInput.vue';
import ButtonVue from '@/components/Button.vue';
import { ref, onMounted } from "vue";
import API from '@/api/API';
import type { AxiosResponse } from 'axios';


interface ElementPosition {
    left: number,
    top: number
}

const props = defineProps({
    resource: {
        type: User,
        default: new User({})
    }
})

const emit = defineEmits(["updated"]);

const api = new API()
const error = ref({});
const currentURL = ref(props.resource.data.photo ??`${api.baseURL}/media/users_profile/user_avatar.png`);
const image = ref<HTMLDivElement>()
const divImage = ref<HTMLDivElement>()

let imageFile: HTMLImageElement = null;
let initialClickPosition: ElementPosition = {left: 0, top: 0};
let initialImagePosition: ElementPosition = {left: 0, top: 0};
let currentImageScale = 1;

const resetDynamics = () => {
    initialClickPosition = {left: 0, top: 0};
    initialImagePosition = {left: 0, top: 0};
    currentImageScale = 1;
    image.value.style.left = `0px`
    image.value.style.top = `0px`
    image.value.style.transform = `scale(1)`
}

const onFileChange = (e: any) => {
    resetDynamics()
    currentURL.value = URL.createObjectURL(e.target.files[0])
    loadImage(currentURL.value)
}

const loadImage: (fileURL: string) => void = (fileURL: string) => {
    imageFile = new Image();
    imageFile.onload = function () {
        fitImage(imageFile.width, imageFile.height)
        const imageStyle = window.getComputedStyle(image.value as Element);
        const imageLeft = parseInt(imageStyle.left)
        const imageTop = parseInt(imageStyle.top)
        initialImagePosition = {
            left: imageLeft,
            top: imageTop
        }
    };
    imageFile.setAttribute('crossorigin', 'anonymous');
    imageFile.src = fileURL;
}

const zoomImage = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    const imageStyle = window.getComputedStyle(image.value as Element)
    if (e.deltaY < 0) {
        currentImageScale += 0.05
        image.value.style.transform = `scale(${currentImageScale})`
    } else {
        currentImageScale -= 0.05
        image.value.style.transform = `scale(${currentImageScale})`
    }

    const imageLeft = parseInt(imageStyle.left)
    const imageTop = parseInt(imageStyle.top)
    initialImagePosition = {
        left: imageLeft,
        top: imageTop
    }
}

const moveImage = (e: any) => {
    initialClickPosition = {
        left: e.clientX,
        top: e.clientY
    }
    e.preventDefault();
    e.stopPropagation();
    window.addEventListener('mousemove', mouseMoving)
    window.addEventListener('mouseup', endMouseMove)
}

const mouseMoving = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { left, top } = calculatePosition(e, initialClickPosition)
    image.value.style.left = `${left}px`
    image.value.style.top = `${top}px`
}

const calculatePosition = (e, initialClickPosition: ElementPosition) => {
    const leftOffset = e.clientX - initialClickPosition.left;
    const topOffset = e.clientY - initialClickPosition.top;
    const left = initialImagePosition.left + leftOffset;
    const top = initialImagePosition.top + topOffset;
    return { left, top }
}


const endMouseMove = (e) => {
    window.removeEventListener('mousemove', mouseMoving)
    window.removeEventListener('mouseup', endMouseMove)
    const imageStyle = window.getComputedStyle(image.value as Element);
    const imageLeft = parseInt(imageStyle.left)
    const imageTop = parseInt(imageStyle.top)
    initialImagePosition = {
        left: imageLeft,
        top: imageTop
    }
}

const fitImage = (width: number, height: number) => {
    if (width > height) {
        image.value.classList.remove('h-auto')
        image.value.classList.remove('w-full')
        image.value.classList.add('h-full')
    } else {
        image.value.classList.remove('h-full')
        image.value.classList.remove('w-auto')
        image.value.classList.add('w-full')
    }
}

const createCanvas = () => {
    
    let canvas = document.createElement('canvas');
    
    // canvas.style.position = 'absolute';
    // canvas.style.left = '0px';
    // canvas.style.top = '0px';
    // canvas.style.zIndex = '5000';
    
    const { width: divWidth, height: divHeight } = divImage.value.getBoundingClientRect()
    canvas.width = 900;
    canvas.height = 900;

    let ctx = canvas.getContext("2d");
    const divWidthRatio = (imageFile.width) / divWidth;
    const divHeightRatio = (imageFile.height) / divHeight;
    const canvasWidthRatio = (imageFile.width) / canvas.width;
    const canvasHeightRatio = (imageFile.height) / canvas.height;

    const currentDivRatio = Math.max(divWidthRatio, divHeightRatio)
     
    const sx = -(initialImagePosition.left*currentDivRatio - ((canvas.width*currentImageScale - canvas.width)/2)*canvasWidthRatio)/currentImageScale;
    const sy = -(initialImagePosition.top*currentDivRatio - ((canvas.height*currentImageScale - canvas.height)/2)*canvasHeightRatio)/currentImageScale;

    ctx.drawImage(
        imageFile, 
        sx,
        sy,
        Math.min(imageFile.width, imageFile.height)/currentImageScale, 
        Math.min(imageFile.width, imageFile.height)/currentImageScale, 
        0, 
        0, 
        canvas.width, 
        canvas.height
    );

    return canvas
}

const sendImage = async (canvas: HTMLCanvasElement) => {
    return new Promise((resolve, reject) => {
        canvas.toBlob(async (blob) => {
            let formData = new FormData();
            const dateNow = getDateNow()
            formData.set('file', blob as Blob, `${props.resource.data.username}_profile_${dateNow}.jpg'`)
            console.log(formData.values)
            const response: AxiosResponse = await api.post(`users/${props.resource.data.id}/upload_file/`, formData)
            resolve(response)
        })
    })
} 

const save: () => void = async () => {
    const canvas = createCanvas();
    const response = await sendImage(canvas)
    if (response.status >= 200 && response.status < 300) {
        const updatedUser = new User(response.data.user)
        return emit('updated', updatedUser)
    } 
    error.value = response.left.message;
    console.log(response.left.message) 

}

const getDateNow = () => {
    return new Date().toLocaleString().replaceAll('/','_').replaceAll(':','_').replaceAll(' ', '__')
}

onMounted(() => {
    loadImage(currentURL.value)
})

</script>

<style scoped>
.circular-mask {
    -webkit-mask-image: radial-gradient(circle at 50% 50%, transparent 70%, rgba(0, 0, 0, 0.8) 50%);
    mask-image: radial-gradient(circle at 50% 50%, transparent 70%, rgba(0, 0, 0, 0.8) 50%);
}
</style>