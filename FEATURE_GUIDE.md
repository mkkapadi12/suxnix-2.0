# Profile & Address Management - User & Developer Guide

## For End Users

### Accessing Your Profile

1. Log in to your Suxnix account
2. Navigate to `/profile` or use the navigation menu
3. View your personal information in the profile header
4. Click "Edit Profile" to modify your details

### Profile Features

- **View Mode**: See all your information at a glance
- **Edit Mode**: Update the following:
  - First Name and Last Name
  - Phone Number
  - Gender (Male/Female/Other)
  - Date of Birth
  - Bio (up to 500 characters)
- **Read-only Fields**: Email (cannot be changed)
- **Profile Picture**: Displays with initials fallback

### Managing Addresses

1. Navigate to `/addresses` from the menu
2. View all your saved addresses in card format

### Adding an Address

1. Click "+ Add New Address" button
2. Fill in all required fields:
   - Address Type (Home/Office/Other)
   - Full Name
   - Phone Number
   - Address Line 1 (Street Address)
   - Address Line 2 (Optional)
   - City
   - State/Province
   - Zip Code
   - Country
3. Optionally check "Set as default address"
4. Click "Add Address"

### Editing an Address

1. Click "Edit" on the address card
2. Modify any fields
3. Click "Update Address"

### Deleting an Address

1. Click "Delete" on the address card
2. Confirm the deletion in the dialog
3. Address will be removed

### Setting Default Address

1. Click "Set as Default" on any address
2. The address will be marked as default (shows badge)
3. Any previous default will be automatically unset

---

## For Developers

### Project Structure

```
src/
├── pages/Customer/
│   ├── Profile/
│   │   ├── Profile.jsx                 (Main page)
│   │   ├── components/
│   │   │   ├── ProfileHeader.jsx       (Header with avatar)
│   │   │   └── ProfileForm.jsx         (Edit/view form)
│   │   └── schemas/
│   │       └── profileSchema.js        (Zod validation)
│   │
│   └── Addresses/
│       ├── Addresses.jsx               (Main page)
│       ├── components/
│       │   ├── AddressCard.jsx         (Address display)
│       │   ├── AddressForm.jsx         (Add/edit form)
│       │   └── DeleteConfirmDialog.jsx (Confirmation)
│       └── schemas/
│           └── addressSchema.js        (Zod validation)
│
├── Store/
│   ├── features/
│   │   ├── profile/
│   │   │   ├── profile.slice.js        (Redux slice)
│   │   │   └── profileAPI.js           (API calls)
│   │   │
│   │   └── address/
│   │       ├── address.slice.js        (Redux slice)
│   │       └── addressAPI.js           (API calls)
│   │
│   └── store.js                        (Store config)

server/
├── models/
│   ├── user.model.js                   (Extended)
│   └── address.model.js                (New)
│
├── controllers/
│   ├── user.controller.js              (Updated)
│   └── address.controller.js           (New)
│
└── routes/
    └── user.routes.js                  (Updated)
```

### Database Schema

#### User Model (Extended)

```javascript
{
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  profilePicture: String,
  phone: String,
  gender: String (enum: Male/Female/Other),
  dateOfBirth: Date,
  bio: String (max 500),
  addresses: [ObjectId] // References to Address docs
}
```

#### Address Model (New)

```javascript
{
  userId: ObjectId (ref: User),
  type: String (enum: Home/Office/Other),
  fullName: String,
  phoneNumber: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
  isDefault: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### API Endpoints

#### Profile

- `GET /auth/users/profile` - Fetch user profile (existing)
- `PUT /auth/users/profile` - Update profile

#### Addresses

- `GET /auth/users/addresses` - Get all addresses
- `POST /auth/users/addresses` - Create new address
- `PUT /auth/users/addresses/:id` - Update address
- `DELETE /auth/users/addresses/:id` - Delete address
- `PATCH /auth/users/addresses/:id/set-default` - Set as default

All endpoints require authentication via `authMiddleware`.

### Redux State Structure

#### Profile State

```javascript
{
  profile: {
    loading: Boolean,
    error: String | null,
    success: Boolean
  }
}
```

#### Address State

```javascript
{
  address: {
    addresses: Array,
    loading: Boolean,
    error: String | null,
    success: Boolean
  }
}
```

### Using Redux Actions

#### Profile

```javascript
import { updateProfile } from '@/Store/features/profile/profile.slice';
import { useDispatch, useSelector } from 'react-redux';

const MyComponent = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.profile);

  const handleUpdate = (data) => {
    dispatch(updateProfile(data))
      .unwrap()
      .then(() => {
        // Success
      })
      .catch((error) => {
        // Handle error
      });
  };
};
```

#### Addresses

```javascript
import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from '@/Store/features/address/address.slice';

// Fetch all addresses
dispatch(getAddresses());

// Create new address
dispatch(createAddress(addressData));

// Update address
dispatch(updateAddress({ id: addressId, data: addressData }));

// Delete address
dispatch(deleteAddress(addressId));

// Set as default
dispatch(setDefaultAddress(addressId));
```

### Form Validation (Zod Schemas)

#### Profile Schema

```javascript
import { profileSchema } from './schemas/profileSchema';

const { errors } = profileSchema.safeParse(formData);
```

#### Address Schema

```javascript
import { addressSchema } from './schemas/addressSchema';

const { errors } = addressSchema.safeParse(formData);
```

### Component Usage

#### ProfileHeader

```jsx
<ProfileHeader user={user} />
```

#### ProfileForm

```jsx
<ProfileForm user={user} />
```

#### AddressCard

```jsx
<AddressCard address={address} onEdit={(address) => handleEdit(address)} />
```

#### AddressForm

```jsx
<AddressForm
  open={formOpen}
  onOpenChange={setFormOpen}
  address={selectedAddress} // null for create mode
/>
```

### Styling Constants

**Suxnix Colors**

- Primary: `#faa432` (bg-suxnix-primary)
- Secondary: `#0d9b4d` (bg-suxnix-secondary)
- Heading: `#222222`
- Body: `#777777`
- White: `#ffffff`

### Error Handling

All API calls include try-catch with proper error messages:

```javascript
try {
  const result = await dispatch(updateProfile(data)).unwrap();
  toast.success('Success!');
} catch (error) {
  toast.error(typeof error === 'string' ? error : error?.message || 'Failed');
}
```

### Common Issues & Solutions

1. **Profile not loading**
   - Ensure token is stored in localStorage
   - Check Redux middleware configuration
   - Verify user is authenticated

2. **Addresses not appearing**
   - Call `getAddresses()` after user login
   - Check Redux address state
   - Verify API endpoint is accessible

3. **Form validation not working**
   - Ensure InputField component is using React Hook Form
   - Check Zod schema definitions
   - Verify zodResolver integration

4. **Address deletion failing**
   - Ensure address ownership verification
   - Check if address exists
   - Verify delete confirmation was accepted

### Adding New Profile Fields

To add a new profile field:

1. **Update User Model** (`server/models/user.model.js`)

```javascript
newField: {
  type: String,
  default: '',
}
```

2. **Update Profile Schema** (`profileSchema.js`)

```javascript
newField: z.string().optional();
```

3. **Update ProfileForm** (`ProfileForm.jsx`)

```jsx
<InputField form={form} name="newField" label="New Field" placeholder="..." />
```

4. **Update Controller** (`user.controller.js`)

```javascript
if (newField !== undefined) updateData.newField = newField;
```

### Adding New Address Types

To add a new address type:

1. **Update Address Model** - Change enum:

```javascript
type: {
  type: String,
  enum: ['Home', 'Office', 'Other', 'NewType'],
  default: 'Home',
}
```

2. **Update Address Schema**:

```javascript
type: z.enum(['Home', 'Office', 'Other', 'NewType']);
```

3. **Update AddressForm** - Add option:

```jsx
<option value="NewType">New Type</option>
```

4. **Update AddressCard** - Add color:

```javascript
case 'NewType':
  return 'bg-yellow-100 text-yellow-800';
```

### Performance Optimization

- Addresses are paginated in the grid layout
- Only fetch addresses once on page load
- Use Redux selectors to prevent unnecessary re-renders
- Form state is isolated and doesn't affect other components

### Testing

#### Unit Tests

- Test validation schemas independently
- Test Redux reducers
- Test component rendering

#### Integration Tests

- Test full CRUD flow for addresses
- Test authentication redirects
- Test form submissions

#### E2E Tests

- Navigate to profile page
- Edit profile fields
- Add/edit/delete addresses
- Set default address

### Deployment Notes

1. Ensure environment variables are set:
   - `JWT_SECRET_KEY` for token generation
   - MongoDB connection string

2. Run migrations if needed:
   - Existing users will have empty profile fields
   - No migration script needed; fields are optional

3. Test with real database before production

4. Monitor error logs for any validation issues

---

## Quick Start for Developers

1. **Setup**

   ```bash
   npm install
   npm run dev
   ```

2. **Test Locally**
   - Create account via `/register`
   - Login via `/login`
   - Navigate to `/profile` and edit
   - Navigate to `/addresses` and manage addresses

3. **Check Backend**
   - Verify all routes are registered
   - Test API endpoints with Postman/Insomnia
   - Check database for created/updated records

4. **Debug**
   - Use Redux DevTools to inspect state
   - Check browser console for errors
   - Monitor network requests
   - Check server logs for API issues
