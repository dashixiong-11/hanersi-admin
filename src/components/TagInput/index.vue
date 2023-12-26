<template>
    <div class="tag-input">
        <div class="input-wrapper">
            <div class="tag" v-for="(item, index) in internalItems" :key="index">
                {{ item }}
            </div>
            <input type="text" v-model="internalValue" @keydown="handleKeydown" placeholder="">
        </div>
    </div>
</template>
  
<script>
import { ref, watchEffect, toRefs } from 'vue'

export default {
    props: {
        modelValue: {
            type: Array,
            default: () => [],
        },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const internalItems = ref([...props.modelValue])
        const internalValue = ref('')

        watchEffect(() => {
            emit('update:modelValue', [...internalItems.value])
        })

        const addToArray = () => {
            if (internalValue.value.trim() !== '') {
                internalItems.value.push(internalValue.value)
                internalValue.value = ''
            }
        }

        const removeLastArrayItem = () => {
            if (internalValue.value.trim() === '') {
                internalItems.value.pop()
            }
        }

        const handleKeydown = (event) => {
            if (event.code === 'Enter') {
                addToArray()
            } else if (event.code === 'Backspace' && internalValue.value.length === 1) {
                event.preventDefault() // Prevent the backspace key from deleting the last character
                internalValue.value = ''  // Manually clear the input field
            } else if (event.code === 'Backspace' && internalValue.value === '') {
                removeLastArrayItem()
            }
        }

        return {
            internalValue,
            internalItems,
            addToArray,
            removeLastArrayItem,
            handleKeydown
        }
    }
}
</script>

<style scoped>
.tag-input {
    display: flex;
    align-items: center;

    .input-wrapper {
        display: flex;
        align-items: center;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        padding: 6px 8px;

        .tag {
            padding: 0 5px;
            line-height: 20px;
            border-radius: 2px;
            background: #4f5159;
            color: #f9f9f9;
            font-size: 14px;
            margin-right: 8px;
        }

        input {
            border: none;
            outline: none;
            padding: 0 5px;
            line-height: 20px;
            font-size: 14px;
            color: #606266;
            width: 100px;
        }
    }
}
</style>