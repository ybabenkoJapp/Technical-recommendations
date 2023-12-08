<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { usePhotosStore } from "@/stores";
import type { IEditePhoto, IPhoto } from "@/app-types/IPhoto";

const photosStore = usePhotosStore();
const { deletePhoto, updatePhoto, fetchPhotos } = photosStore;
const photos = ref([] as IPhoto[]);
const editedPhoto = ref<IEditePhoto>({
  id: null,
  title: "",
  thumbnailUrl: "",
});
const newImage = ref<string | ArrayBuffer | null>();
const dialog = ref(false);

onMounted(() => {
  // call data from sessionStorage
  const sessionPhotos = sessionStorage.getItem("photos");
  if (sessionPhotos) {
    photos.value = JSON.parse(sessionPhotos);
  } else {
    fetchPhotos();
  }
});

function editPhoto(photo: IEditePhoto) {
  editedPhoto.value = { ...photo };
  dialog.value = true;
}

function onFileChange(event: Event & { target: HTMLInputElement }) {
  const file = event.target.files?.[0];

  if (file) {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      if (e.target) {
        newImage.value = e.target.result as string;
      }
    };

    fileReader.readAsDataURL(file);
  }
}

function clearData() {
  editedPhoto.value = {
    id: null,
    title: "",
    thumbnailUrl: "",
  };
}

function saveEdit() {
  if (newImage.value) {
    editedPhoto.value.thumbnailUrl = newImage.value;
  }

  // Call the updatePhoto method with the edited photo data
  updatePhoto(editedPhoto.value.id as number, editedPhoto.value as IPhoto);
  // Clear data
  clearData();
  dialog.value = false;
}
</script>

<template>
  <section class="photos-view">
    <v-container>
      <v-row>
        <v-col
          v-for="photo in photos"
          v-if="photos.length"
          :key="photo.id"
          cols="12"
          md="4"
          sm="6"
        >
          <v-card>
            <v-img :alt="photo.title" :src="photo.thumbnailUrl"></v-img>
            <v-card-title>{{ photo.title }}</v-card-title>
            <v-card-actions>
              <v-btn
                density="comfortable"
                variant="elevated"
                @click="editPhoto(photo)"
                >Edit
              </v-btn>
              <v-btn
                color="error"
                density="comfortable"
                variant="elevated"
                @click="deletePhoto(photo.id)"
                >Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>Edit Photo</v-card-title>
      <v-card-text>
        <v-text-field v-model="editedPhoto.title" label="Title"></v-text-field>
        <v-file-input
          label="Choose a file"
          @change="onFileChange"
        ></v-file-input>
      </v-card-text>
      <v-card-actions>
        <v-btn density="comfortable" variant="elevated" @click="saveEdit"
          >Save
        </v-btn>
        <v-btn
          color="error"
          density="comfortable"
          variant="elevated"
          @click="
            () => {
              dialog = false;
              clearData;
            }
          "
          >Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
.photos-view {
  width: 100vw;
}
</style>