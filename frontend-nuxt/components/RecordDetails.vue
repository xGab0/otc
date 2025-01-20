<script setup lang="ts">
import type { OdooField } from '~/hooks/odoo/fields';
import UsersDropdown from './dropdowns/UsersDropdown.vue';
import ButtonDynamic from './buttons/ButtonDynamic.vue';
import { type ModelQueryBuilder, type OdooRecord, type OdooRecordSyntax } from '~/hooks/odoo/wrapper';
import type { OdooUserData } from '~/hooks/odoo/data';
import type { HrAttendance } from '~/hooks/hr';

interface Props {
  fields: OdooField[],
  record: HrAttendance,
  //admin: [id: number, name: string]
  admin: number,
  queryBuilder: ModelQueryBuilder<OdooRecord>
}

const { fields, record, queryBuilder } = defineProps<Props>();

const emit = defineEmits<{
  modifyRecord: [oldRecord: any, newRecord: any]
  close: []
}>()

const checkin = computed(() => record.check_in);
const checkinLatitude = computed(() => record.check_in_latitude);
const checkinLongitude = computed(() => record.check_in_longitude);

const checkout = computed(() => record.check_out);
const checkoutLatitude = computed(() => record.check_out_latitude);
const checkoutLongitude = computed(() => record.check_out_longitude);

const formattedDate = ref<string>('');
const errorMessage = ref<string>('');

const user = computed<string>(() => record.employee_id[1]);


const prova = computed<OdooRecordSyntax>(() => ({
  employee_id: record.employee_id,
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
  checkoutLatitude.value = position.coords.latitude;
  checkinLongitude.value = position.coords.longitude;
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


onMounted(async () => {
  console.log('RecordDetails | prop:fields');
  console.log(fields);

  getTodayDate();
  getUserLocation();
});
</script>

<template>
  <div class="record creator">
    <div class="flex flex-col">
      <span class="text-2xl font-bold">Record Details ({{ record.id }})</span>
      <span class="text-normal text-gray-600 font-normal">Check details about this record</span>
    </div>

    <form>
      <GoogleMapsAttendance />

      <div>
        <span>Utente</span>
        <input v-model="user" type="text" placeholder="checkin longitude" readonly />
      </div>

      <div>
        <span>Checkin Latitude</span>
        <input v-model=checkinLatitude type="text" placeholder="checkin latitude" readonly/>
      </div>

      <div>
        <span>Checkin Longitude</span>
        <input v-model="checkinLongitude" type="text" placeholder="checkin longitude" readonly/>
      </div>

      <div>
        <span>Checkout Latitude</span>
        <input v-model=checkoutLatitude type="text" placeholder="checkin latitude" readonly/>
      </div>
 
      <div>
        <span>Checkout Longitude</span>
        <input v-model="checkoutLongitude" type="text" placeholder="checkin longitude" readonly/>
      </div>
    </form>

    <div class="flex justify-between">
      <ButtonDynamic name="Chiudi" :color="{r: 239, g: 200, b: 200}" @mousedown="() => emit('close')"/>

      <ButtonDynamic v-if="!record.check_out" name="Checkout" :color="{r: 225, g: 255, b: 231}" @mousedown="async () => {
        const date = new Date();
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // I mesi partono da 0, quindi aggiungiamo 1
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');

        // Formatta la data nel formato desiderato 'YYYY-MM-DD HH:mm:ss'
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        const result: boolean = await queryBuilder.writeRecord(record.id, {
          check_out: formattedDate,
          check_out_latitude: latitude,
          check_out_longitude: longitude
        });

        console.log(result);

        const newRecord = await queryBuilder.searchReadRecords([['id', '=', record.id]], [], undefined, 1);

        console.log(newRecord);

        emit('modifyRecord', record, newRecord);
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