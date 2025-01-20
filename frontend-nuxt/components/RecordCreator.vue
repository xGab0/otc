<script setup lang="ts">
import type { OdooField } from '~/hooks/odoo/fields';
import UsersDropdown from './dropdowns/UsersDropdown.vue';
import ButtonDynamic from './buttons/ButtonDynamic.vue';
import { type ModelQueryBuilder, type OdooRecord, type OdooRecordSyntax } from '~/hooks/odoo/wrapper';
import type { OdooUserData } from '~/hooks/odoo/data';

interface Props {
  fields: OdooField[],
  queryBuilder: ModelQueryBuilder<OdooRecord>
}

const { fields, queryBuilder } = defineProps<Props>();

const emit = defineEmits<{
  createRecord: [record: any]
  close: []
}>()

const checkin = ref<string>();
const selectedUser = ref<OdooUserData>();
const formattedDate = ref<string>('');
const latitude = ref<number>(0);
const longitude = ref<number>(0);
const errorMessage = ref<string>('');


const prova = computed<OdooRecordSyntax>(() => ({
  employee_id: selectedUser.value,
  check_in: checkin.value,
  check_in_latitude: latitude.value,
  check_in_longitude: longitude.value
}));

/*
const prova = ref<OdooRecordSyntax>({
  employee_id: selectedUser.value?.id,
  check_in: checkin.value,
  check_in_latitude: latitude.value,
  check_in_longitude: longitude.value
});
*/

const increment = () => {
  //prova.value = 'addioooo';
};

defineExpose({
  prova,
  increment
});

const getTodayDate = () => {
  const date = new Date();
  const formattedTodayDate = new Intl.DateTimeFormat('it-IT', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // usa il formato a 24 ore
  }).format(date);

  formattedDate.value = formattedTodayDate;

  console.log(formattedDate); // Esempio: 17/01/2025, 14:30:15
}

// Funzione per ottenere la posizione
const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError
    );
  } else {
    errorMessage.value = 'Geolocalizzazione non supportata nel tuo browser.';
  }
};

// Gestore del successo: aggiorna latitudine e longitudine
const handleSuccess = (position: GeolocationPosition) => {
  latitude.value = position.coords.latitude;
  longitude.value = position.coords.longitude;
};

// Gestore degli errori
const handleError = (error: GeolocationPositionError) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      errorMessage.value = 'L\'utente ha negato il permesso per la geolocalizzazione.';
      break;
    case error.POSITION_UNAVAILABLE:
      errorMessage.value = 'Posizione non disponibile.';
      break;
    case error.TIMEOUT:
      errorMessage.value = 'La richiesta di geolocalizzazione è scaduta.';
      break;
    default:
      errorMessage.value = 'Errore sconosciuto.';
      break;
  }
};

const onUserSelected = (user: OdooUserData, index: number) => {
  selectedUser.value = user;
}

const createRecord = async () => {
  const record = await queryBuilder.createRecord({
    employee_id: selectedUser.value!.id,
    check_in: checkin,
    check_in_latitude: latitude,
    check_in_longitude: longitude
  });

  console.log(record);

  emit('createRecord', record);
  emit('close');
}

/*
watch(newRecord, () => {
  console.log('updated new record');
})
*/

/*
watch(latitude, (newLatitude, oldLatitude) => {
  newRecord.value.check_in_latitude = newLatitude;
});

watch(longitude, (newLongitude, oldLongitude) => {
  newRecord.value.check_in_longitude = newLongitude;
});
*/


onMounted(async () => {
  //users.value = await authStore.odooUser!.searchReadRecord('res.users');

  console.log('RecordCreator | prop:fields');
  console.log(fields);

  //console.log('RecordCreator | users');
  //console.log(users.value);

  getTodayDate();
  getUserLocation();
});
</script>

<template>
  <div class="record creator">
    <div class="flex flex-col">
      <span class="text-2xl font-bold">New Record</span>
      <span class="text-normal text-gray-600 font-normal">Compile the form to create a new record for the current model</span>
    </div>

    <form>
      <GoogleMapsAttendance />

      <div>
        <span>Users Dropdown</span>
        <UsersDropdown @user-selected="onUserSelected"/>
      </div>

      <!--div>
        <span>Checkin</span>
        <input v-model="formattedDate" type="text" placeholder="checkin" readonly/>
      </div-->

      <div>
        <span>Checkin Latitude</span>
        <input v-model=latitude type="text" placeholder="checkin latitude" readonly/>
      </div>

      <div>
        <span>Checkin Longitude</span>
        <input v-model="longitude" type="text" placeholder="checkin longitude" readonly/>
      </div>
    </form>

    <div class="flex justify-between">
      <ButtonDynamic name="Annulla" :color="{r: 239, g: 200, b: 200}" @mousedown="() => emit('close')"/>

      <ButtonDynamic v-if="selectedUser && latitude && longitude" name="Crea record" :color="{r: 225, g: 255, b: 231}" @mousedown="async () => {
        const record = await queryBuilder.createRecord({
          employee_id: selectedUser?.id,
          check_in: checkin,
          check_in_latitude: latitude,
          check_in_longitude: longitude
        });

        console.log(record);

        emit('createRecord', record);
        emit('close');
      }"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.record.creator {
  display: flex;
  flex-direction: column;
  gap: 30px;

  .title {
    font-size: 26px;
    font-weight: 600;

    letter-spacing: -.025em;
  }

  form {
    display: grid;
    grid-template-columns: repeat(max(1), auto);
    grid-template-rows: max(3);

    row-gap: 16px;
    column-gap: 30px;

    div {
      display: flex;
      flex-direction: column;
      gap: 6px;

      span {
        font-size: 14px;
        font-weight: 400;
      }

      input {
        padding: 8px;
        border-radius: 8px;

        outline: none;
        border: solid 1px rgb(224, 224, 224);

        box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
      }
    }

    span {
      font-weight: 500;
    }
  }
}
</style>