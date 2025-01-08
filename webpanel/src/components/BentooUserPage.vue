<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { OdooConnection, OdooUser } from '../../../typescript/lib/wrapper';
import { type OdooField } from '../../../typescript/lib/fields';
import IconChevron from './icons/IconChevron.vue';
const connection = ref<OdooConnection>();
const user = ref<OdooUser>();

const userdata = ref<any>();
const avatarBase64 = ref<string>();

const loaded = ref<boolean>(false);

function formatTime(decimalTime: number) {
  const hours = Math.floor(decimalTime); // Prendi la parte intera (ore)
  const minutes = Math.round((decimalTime - hours) * 60); // Moltiplica la parte decimale per 60 per ottenere i minuti

  // Aggiungi uno zero davanti ai minuti se sono inferiori a 10
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

onMounted(async () => {
  console.log('connecting...');

  connection.value = await OdooConnection.connect('/odoo');
  user.value = await connection.value.login('odoo-otc-db', 'admin', 'admin');

  const userDetails = await user.value.searchReadRecord('res.users',
    [['id', '=', user.value.uid]],  // Filtro per l'ID dell'utente
    [],
    undefined,
    undefined
  );

  // Verifica se l'utente è stato trovato
  if (userDetails.length === 0) {
    throw new Error(`User with ID ${user.value.uid} not found`);
  }

  // Restituisci i dettagli dell'utente
  userdata.value = userDetails[0];

  console.log(userdata.value);

  avatarBase64.value = userdata.value.avatar_1920;

  loaded.value = true;
})
</script>

<template>
  <div v-if="loaded" class="bento">
    <div class="avatar"/>
    <div class="right-section">
      <label>{{userdata.display_name}}</label>

      <div class="test">
      <div class="data">
        <label class="key">Company</label>
        <p/>
        <label class="value">{{userdata.company_id[1]}}</label>
      </div>

      <div class="data">
        <label class="key">Department</label>
        <p/>
        <label class="value">{{userdata.department_id[1]}}</label>
      </div>

      <div class="data">
        <label class="key">Email</label>
        <p/>
        <label class="value">{{userdata.email}}</label>
      </div>

      <div class="data">
        <label class="key">Telefono di lavoro</label>
        <p/>
        <label class="value">{{userdata.employee_phone}}</label>
      </div>

      <div class="data">
        <label class="key">Tipo dipendente</label>
        <p/>
        <label class="value">{{userdata.employee_type}}</label>
      </div>

      <div class="data">
        <label class="key">Titolo</label>
        <p/>
        <label class="value">{{userdata.job_title}}</label>
      </div>

      <div class="data">
        <label class="key">Telefono personale</label>
        <p/>
        <label class="value">{{userdata.phone}}</label>
      </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bento {
  width: 100%;

  padding: 10px;

  display: flex;

  border-radius: 24px;
  background-color: rgba(230, 230, 230);

  .avatar {
    width: 10%;
    height: 100px;
    background-color: rgba(200, 255, 200, 1);
  }
}

.test {
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 26px;
  row-gap: 8px;

  .data {
    .key {
      font-size: 12px;
      font-weight: 600;
      color: rgb(50, 50, 50);
    }
    .value {
      font-size: 16px;
    }
  }
}
</style>
