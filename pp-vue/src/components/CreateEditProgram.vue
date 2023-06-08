<script setup lang="ts">
import { Program } from '@/modules/program/Program';
import { ref, type PropType } from 'vue'
import { useProgramStore } from '@/modules/program/store';
import { User } from '@/modules/user/User';

const programStore = useProgramStore();

const valid = ref(false);

const emit = defineEmits(['drawerClose'])

const props = defineProps({
    program: { type: Object as PropType<Program>, required: true },
    userList: { type: Array as PropType<User[]>, required: true },
    isEdit: { type: Boolean },
});

const program = ref(props.program).value;
</script>
<template>
    <v-card color="transparent" elevation="0">
        <v-card-title class="text-h4">New Program</v-card-title>
        <!-- <v-card-subtitle class="text-h6 pt-8" style="color:#7C5DF9!important"><strong>Bill From</strong></v-card-subtitle> -->
        <v-form v-model="valid" :min-width="600">
            <v-container justify="center">
                <v-row>
                    <v-col
                    cols="12"
                    >
                        <span class="input-ph">Name</span><br />
                        <v-text-field
                            v-model="program.name"
                            required
                            class="pt-4"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4">
                        <span class="input-ph">Description</span><br />
                        <v-text-field
                            v-model="program.description"
                            required
                            class="pt-4"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-card-subtitle class="text-h6 pt-8" style="color:#7C5DF9!important"><strong>Bill To</strong></v-card-subtitle>
                </v-row>
                <!-- <v-row>
                    <v-col
                    cols="12"
                    >
                        <span class="input-ph">Client Name</span><br />
                        <v-text-field
                            v-model="program.clientName"
                            required
                            class="pt-4"
                            variant="outlined"
                            data-test="invoice-client-name"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                    cols="12"
                    >
                        <span class="input-ph">Client Email</span><br />
                        <v-text-field
                            v-model="program.clientEmail"
                            required
                            class="pt-4"
                            variant="outlined"
                            data-test="invoice-client-email"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                    cols="12"
                    >
                        <span class="input-ph">Street Address</span><br />
                        <v-text-field
                            v-model="program.clientAddress.street"
                            required
                            class="pt-4"
                            variant="outlined"
                            data-test="invoice-clientAdd-street"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4">
                        <span class="input-ph">City</span><br />
                        <v-text-field
                            v-model="program.clientAddress.city"
                            required
                            class="pt-4"
                            variant="outlined"
                            data-test="invoice-clientAdd-city"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <span class="input-ph">Post Code</span><br />
                        <v-text-field
                            v-model="program.clientAddress.postCode"
                            required
                            class="pt-4"
                            variant="outlined"
                            data-test="invoice-clientAdd-postCode"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <span class="input-ph">Country</span><br />
                        <v-text-field
                            v-model="program.clientAddress.country"
                            required
                            class="pt-4"
                            variant="outlined"
                            data-test="invoice-clientAdd-country"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                    cols="6"
                    >
                        <span class="input-ph">Invoice Date</span>
                        <v-text-field 
                            type="date" 
                            v-model="program.createdAt"
                            data-test="invoice-createdAt"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <span class="inpout-ph">Payment Terms</span>
                        <v-select
                            single-line
                            :items="paymentTermsItems"
                            v-model="program.paymentTerms"
                            item-title="name"
                            item-value="val"
                            data-test="invoice-payment-terms"
                        >
                        </v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <span class="input-ph">Project Description</span>
                        <v-text-field
                            v-model="program.description"
                            placeholder="e.g. Graphic Desgin Service"
                            data-test="invoice-description"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <span class="text-h5">Item List</span>
                </v-row>
                <v-row>
                    <v-col cols="5">
                        <span>Item Name</span>
                    </v-col>
                    <v-col cols="2">
                        <span>Qty.</span>
                    </v-col>
                    <v-col cols="2">
                        <span>Price</span>
                    </v-col>
                    <v-col cols="3">
                        <span>Total</span>
                    </v-col>
                </v-row>
                <v-row
                    v-for="(item, idx) in program.items"
                    :key="idx"
                >
                    <v-col cols="5">
                        <v-text-field
                            v-model="item.name"
                            variant="outlined"
                            type="string"
                            :data-test="`invoice-item-name-${idx}`"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field
                            v-model.number="item.quantity"
                            variant="outlined"
                            type="number"
                            :data-test="`invoice-item-quantity-${idx}`"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field
                            v-model.number="item.price"
                            variant="outlined"
                            type="number"
                            :data-test="`invoice-item-price-${idx}`"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field
                            :value="program.items[idx].quantity * program.items[idx].price"
                            variant="outlined"
                            :data-test="`invoice-item-total-${idx}`"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="1">
                        <v-btn
                            block
                            rounded="xl"
                            size="large"
                            color="#7C5DF9"
                            variant="flat" 
                            class="text-none"
                            @click.stop="program.removeItem(idx)"
                            :data-test="`invoice-item-remove-${idx}`"
                        >X</v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-btn
                        block
                        rounded="xl"
                        size="large"
                        color="#1F213A"
                        variant="flat" 
                        class="text-none"
                        @click.stop="newItem()"
                        data-test="invoice-item-add"
                        >+ Add New Item</v-btn>
                    </v-col>
                </v-row>
                <v-row class="mt-10">
                    <v-col cols="2">
                        <v-btn
                        block
                        rounded="xl"
                        size="large"
                        color="#FFFFFF"
                        variant="flat" 
                        class="text-none"
                        style="color:#1F213A!important;"
                        @click.stop="discard()"
                        data-test="invoice-discard"
                        >Discard</v-btn>
                    </v-col>
                    <v-col cols="2"></v-col>
                    <v-col cols="4">
                        <v-btn
                        block
                        rounded="xl"
                        size="large"
                        color="#373B54"
                        variant="flat" 
                        class="text-none"
                        @click.stop="saveInvoice(invoice)"
                        data-test="invoice-save-as-draft"
                        >Save as Draft</v-btn>
                    </v-col>
                    <v-col cols="4">
                        <v-btn
                        block
                        rounded="xl"
                        size="large"
                        color="#7C5DF9"
                        variant="flat" 
                        class="text-none"
                        @click.stop="isEdit ? updateInvoice(invoice) : createInvoice(invoice)"
                        data-test="invoice-save-send"
                        >Save &amp; Send</v-btn>
                    </v-col>
                </v-row> -->
            </v-container>
        </v-form>
    </v-card>
</template>