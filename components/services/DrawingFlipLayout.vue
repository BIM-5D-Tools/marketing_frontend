<!-- frontend/components/services/DrawingFlipLayout.vue -->
<template>
  <div class="space-y-6">
    
    <!-- KHUNG VIEWER TỔNG THỂ (LIGHT THEME) -->
    <div 
      ref="viewerContainerRef"
      class="relative w-full bg-slate-100/90 rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl flex flex-col items-center justify-between select-none min-h-[750px] transition-all"
    >
      
      <!-- Top Bar: Tiêu đề & Chọn tài liệu -->
      <div class="w-full bg-white/95 backdrop-blur-md px-6 py-3.5 flex items-center justify-between text-slate-800 border-b border-slate-200/80 z-30 shadow-xs">
        <div class="flex items-center gap-3">
          <span class="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
          <span class="text-sm font-bold tracking-tight text-slate-900 truncate max-w-md">
            {{ currentFileTitle || 'Hồ Sơ Bản Vẽ & Tài Liệu PDF' }}
          </span>
        </div>

        <div v-if="drawingList.length > 1" class="flex items-center gap-2">
          <span class="text-xs font-semibold text-slate-500">Chọn tập:</span>
          <select 
            v-model="selectedDrawingIndex" 
            class="bg-slate-50 border border-slate-200 text-xs font-medium rounded-xl px-3 py-1.5 text-slate-700 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
          >
            <option v-for="(item, idx) in drawingList" :key="item.id || idx" :value="idx">
              {{ item.title || `Tập tài liệu ${idx + 1}` }}
            </option>
          </select>
        </div>
      </div>

      <!-- Khu vực hiển thị sách 3D & 2 Nút Next/Prev Nổi Trên Trang -->
      <div class="relative w-full flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden bg-slate-100/80">
        
        <!-- Loading State -->
        <div v-if="isLoading" class="flex flex-col items-center gap-3 text-slate-500">
          <div class="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span class="text-sm font-semibold">Đang dựng trang sách 3D ({{ renderedCount }}/{{ totalPages }} trang)...</span>
        </div>

        <!-- 2 Nút Next / Prev Nổi Trực Tiếp 2 Bên Trang Sách -->
        <button 
          v-show="!isLoading && totalPages > 1"
          @click="flipPrev" 
          :disabled="currentPageDisplay <= 1"
          class="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600 flex items-center justify-center backdrop-blur-md border border-slate-200/90 shadow-xl disabled:opacity-20 disabled:cursor-not-allowed transition-all group cursor-pointer"
          title="Trang trước"
        >
          <svg class="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <button 
          v-show="!isLoading && totalPages > 1"
          @click="flipNext" 
          :disabled="currentPageDisplay >= totalPages"
          class="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600 flex items-center justify-center backdrop-blur-md border border-slate-200/90 shadow-xl disabled:opacity-20 disabled:cursor-not-allowed transition-all group cursor-pointer"
          title="Trang sau"
        >
          <svg class="w-6 h-6 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <!-- Container Lật Sách StPageFlip -->
        <div 
          v-show="!isLoading && totalPages > 0" 
          class="flex justify-center items-center py-4 w-full transition-transform duration-500 ease-out origin-center"
          :style="{ 
            transform: `scale(${zoomLevel}) ${centerShiftTransform}` 
          }"
        >
          <div ref="flipBookRef" class="book-container flex justify-center items-center">
            <!-- Canvas Pages render ở đây -->
          </div>
        </div>

        <!-- Thumbnail Drawer (Tông sáng) -->
        <div 
          v-if="showThumbnails" 
          class="absolute bottom-16 left-0 right-0 h-36 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3.5 z-30 flex items-center gap-4 overflow-x-auto shadow-2xl transition-all"
        >
          <div 
            v-for="(thumb, idx) in thumbnailList" 
            :key="idx"
            @click="goToPage(idx + 1)"
            class="relative flex-shrink-0 h-28 aspect-[3/4] bg-white rounded-lg border-2 cursor-pointer transition-all hover:scale-105 shadow-xs"
            :class="currentPageDisplay === idx + 1 ? 'border-blue-600 shadow-md shadow-blue-600/30' : 'border-slate-200 opacity-70 hover:opacity-100'"
          >
            <img :src="thumb" class="w-full h-full object-cover rounded-md" />
            <span class="absolute bottom-1 right-1 bg-slate-900/80 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
              {{ idx + 1 }}
            </span>
          </div>
        </div>

      </div>

      <!-- THANH ĐIỀU KHIỂN BOTTOM TOOLBAR (TÔNG SÁNG) -->
      <div class="w-full bg-white px-4 py-3 flex items-center justify-center gap-1 sm:gap-2 text-slate-600 border-t border-slate-200/80 z-30 shadow-xs">
        
        <!-- Go First Page -->
        <button @click="goToPage(1)" :disabled="currentPageDisplay <= 1" class="toolbar-btn" title="Về trang bìa">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/></svg>
        </button>

        <!-- Prev Page -->
        <button @click="flipPrev" :disabled="currentPageDisplay <= 1" class="toolbar-btn" title="Trang trước">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        </button>

        <!-- Page Indicator Input -->
        <div class="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800">
          <input 
            type="number" 
            v-model.lazy="inputPageNumber" 
            @keyup.enter="goToPage(inputPageNumber)"
            class="w-8 bg-transparent text-center focus:outline-none text-blue-600 font-bold"
            min="1" 
            :max="totalPages" 
          />
          <span class="text-slate-400">/ {{ totalPages }}</span>
        </div>

        <!-- Next Page -->
        <button @click="flipNext" :disabled="currentPageDisplay >= totalPages" class="toolbar-btn" title="Trang sau">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>

        <!-- Go Latest Page -->
        <button @click="goToPage(totalPages)" :disabled="currentPageDisplay >= totalPages" class="toolbar-btn" title="Đến trang cuối">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/></svg>
        </button>

        <div class="h-4 w-[1px] bg-slate-200 mx-1.5"></div>

        <!-- Auto Play -->
        <button v-if="totalPages > 1" @click="toggleAutoPlay" class="toolbar-btn" :class="{ '!text-blue-600 !bg-blue-50': isAutoPlaying }" title="Tự động lật trang">
          <svg v-if="!isAutoPlaying" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </button>

        <!-- Thumbnails Toggle -->
        <button @click="showThumbnails = !showThumbnails" class="toolbar-btn" :class="{ '!text-blue-600 !bg-blue-50': showThumbnails }" title="Xem toàn bộ thumbnail">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
        </button>

        <!-- Zoom In -->
        <button @click="zoomIn" class="toolbar-btn" title="Phóng to">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/></svg>
        </button>

        <!-- Zoom Out -->
        <button @click="zoomOut" class="toolbar-btn" title="Thu nhỏ">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"/></svg>
        </button>

        <!-- Audio Sound Toggle -->
        <button @click="isSoundEnabled = !isSoundEnabled" class="toolbar-btn" :class="{ '!text-blue-600 !bg-blue-50': isSoundEnabled }" title="Âm thanh lật sách">
          <svg v-if="isSoundEnabled" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
          <svg v-else class="w-4 h-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/></svg>
        </button>

        <!-- Fullscreen -->
        <button @click="toggleFullscreen" class="toolbar-btn" title="Toàn màn hình">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
        </button>

      </div>

    </div>

    <!-- KHỐI TOOL SO SÁNH BẢN VẼ / EMBED NẾU CÓ -->
    <div v-if="detail?.embed_conflict_tool_url" class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
      <h3 class="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
        Công Cụ So Sánh Phiên Bản & Kiểm Tra Va Chạm
      </h3>
      <div class="aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
        <iframe :src="detail.embed_conflict_tool_url" class="w-full h-full border-0"></iframe>
      </div>
    </div>

  </div>
</template>

<script setup>
const props = defineProps({
  detail: {
    type: Object,
    default: () => ({})
  }
})

const { getMediaUrl } = useApi()

const viewerContainerRef = ref(null)
const flipBookRef = ref(null)
const selectedDrawingIndex = ref(0)
const isLoading = ref(false)
const totalPages = ref(0)
const renderedCount = ref(0)
const currentPageDisplay = ref(1)
const inputPageNumber = ref(1)

const zoomLevel = ref(1)
const showThumbnails = ref(false)
const isAutoPlaying = ref(false)
const isSoundEnabled = ref(true)
const thumbnailList = ref([])

let pageFlipInstance = null
let autoPlayTimer = null

const drawingList = computed(() => props.detail?.drawings || [])

const currentFile = computed(() => {
  if (drawingList.value.length === 0) return null
  return drawingList.value[selectedDrawingIndex.value] || drawingList.value[0]
})

const currentFileTitle = computed(() => currentFile.value?.title || '')

const currentFileUrl = computed(() => {
  if (!currentFile.value) return null
  return getMediaUrl(currentFile.value.file_or_image)
})

// Tự động căn giữa trang bìa 1 và trang bìa cuối
const centerShiftTransform = computed(() => {
  if (totalPages.value <= 1) return 'translateX(0px)'
  
  if (currentPageDisplay.value === 1) {
    return 'translateX(-25%)'
  }
  
  if (currentPageDisplay.value >= totalPages.value) {
    return 'translateX(25%)'
  }
  
  return 'translateX(0%)'
})

// Âm thanh lật sách Web Audio API
const playFlipAudio = () => {
  if (!isSoundEnabled.value || !import.meta.client) return
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    const bufferSize = audioCtx.sampleRate * 0.12
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25))
    }
    const noise = audioCtx.createBufferSource()
    noise.buffer = buffer
    const filter = audioCtx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(900, audioCtx.currentTime)
    noise.connect(filter)
    filter.connect(audioCtx.destination)
    noise.start()
  } catch (e) {}
}

// Khởi tạo Flipbook 3D
const initPdfFlipBook = async (pdfUrl) => {
  if (!pdfUrl || !import.meta.client) return
  isLoading.value = true
  totalPages.value = 0
  renderedCount.value = 0
  thumbnailList.value = []
  currentPageDisplay.value = 1
  inputPageNumber.value = 1

  try {
    const pdfjsLib = await import('pdfjs-dist/build/pdf')
    const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry')
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

    const loadingTask = pdfjsLib.getDocument({
      url: pdfUrl,
      cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
      cMapPacked: true
    })

    const pdfDoc = await loadingTask.promise
    totalPages.value = pdfDoc.numPages

    if (pageFlipInstance) {
      pageFlipInstance.destroy()
      pageFlipInstance = null
    }

    const bookContainer = flipBookRef.value
    bookContainer.innerHTML = ''

    let pageWidth = 500
    let pageHeight = 700

    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum)
      const viewport = page.getViewport({ scale: 1.5 })

      if (pageNum === 1) {
        pageWidth = Math.min(500, Math.floor(viewport.width / 1.5))
        pageHeight = Math.floor((viewport.height / viewport.width) * pageWidth)
      }

      const canvas = document.createElement('canvas')
      canvas.className = 'page-canvas'
      canvas.width = viewport.width
      canvas.height = viewport.height

      const ctx = canvas.getContext('2d')
      await page.render({ canvasContext: ctx, viewport: viewport }).promise

      thumbnailList.value.push(canvas.toDataURL('image/jpeg', 0.5))

      const pageWrapper = document.createElement('div')
      
      if (pdfDoc.numPages === 1) {
        pageWrapper.className = 'page page-single bg-white'
      } else {
        if (pageNum === 1) {
          pageWrapper.className = 'page page-cover page-cover-front bg-white'
          pageWrapper.setAttribute('data-density', 'hard')
        } else if (pageNum === pdfDoc.numPages) {
          pageWrapper.className = 'page page-cover page-cover-bottom bg-white'
          pageWrapper.setAttribute('data-density', 'hard')
        } else {
          pageWrapper.className = 'page page-inner bg-white'
          pageWrapper.setAttribute('data-density', 'soft')
        }
      }

      pageWrapper.appendChild(canvas)
      bookContainer.appendChild(pageWrapper)
      renderedCount.value = pageNum
    }

    const { PageFlip } = await import('page-flip')
    const isSinglePageDoc = pdfDoc.numPages === 1

    pageFlipInstance = new PageFlip(bookContainer, {
      width: pageWidth,
      height: pageHeight,
      size: 'fixed',
      minWidth: 320,
      maxWidth: 900,
      minHeight: 450,
      maxHeight: 1200,
      drawShadow: true,
      flippingTime: 700,
      usePortrait: isSinglePageDoc,
      startZIndex: 5,
      autoSize: true,
      maxShadowOpacity: 0.35,
      showCover: !isSinglePageDoc,
      mobileScrollSupport: false
    })

    pageFlipInstance.loadFromHTML(bookContainer.querySelectorAll('.page'))

    pageFlipInstance.on('flip', (e) => {
      currentPageDisplay.value = e.data + 1
      inputPageNumber.value = e.data + 1
      playFlipAudio()
    })

  } catch (error) {
    console.error('Lỗi Flipbook:', error)
  } finally {
    isLoading.value = false
  }
}

const flipNext = () => {
  if (pageFlipInstance) pageFlipInstance.flipNext()
}

const flipPrev = () => {
  if (pageFlipInstance) pageFlipInstance.flipPrev()
}

const goToPage = (num) => {
  const target = Math.max(1, Math.min(totalPages.value, Number(num)))
  if (pageFlipInstance) {
    pageFlipInstance.flip(target - 1)
  }
}

const zoomIn = () => {
  if (zoomLevel.value < 1.5) zoomLevel.value += 0.15
}

const zoomOut = () => {
  if (zoomLevel.value > 0.7) zoomLevel.value -= 0.15
}

const toggleAutoPlay = () => {
  isAutoPlaying.value = !isAutoPlaying.value
  if (isAutoPlaying.value) {
    autoPlayTimer = setInterval(() => {
      if (currentPageDisplay.value >= totalPages.value) {
        goToPage(1)
      } else {
        flipNext()
      }
    }, 3500)
  } else {
    clearInterval(autoPlayTimer)
  }
}

const toggleFullscreen = () => {
  if (!viewerContainerRef.value) return
  if (!document.fullscreenElement) {
    viewerContainerRef.value.requestFullscreen().catch(err => alert(err.message))
  } else {
    document.exitFullscreen()
  }
}

watch(currentFileUrl, (newUrl) => {
  if (newUrl) initPdfFlipBook(newUrl)
})

onMounted(() => {
  if (currentFileUrl.value) {
    initPdfFlipBook(currentFileUrl.value)
  }
})

onBeforeUnmount(() => {
  if (pageFlipInstance) pageFlipInstance.destroy()
  if (autoPlayTimer) clearInterval(autoPlayTimer)
})
</script>

<style scoped>
.toolbar-btn {
  @apply p-2 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-blue-600 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center;
}

.book-container {
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.stf__wrapper) {
  margin: 0 auto !important;
}

:deep(.page) {
  background-color: #ffffff;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(226, 232, 240, 0.8);
}

:deep(.page-single) {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
}

:deep(.page-canvas) {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

/* Nếp gấp gáy sách ở giữa khi mở 2 trang */
:deep(.page-inner.--left) {
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: inset -10px 0 18px -10px rgba(0, 0, 0, 0.15);
}

:deep(.page-inner.--right) {
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: inset 10px 0 18px -10px rgba(0, 0, 0, 0.15);
}
</style>