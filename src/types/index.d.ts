interface PaginatedResults<T> {
   previousPageUrl?: string
   nextPageUrl?: string
   query?: any
   results: T[]
}

interface FileRecord {
   id: string
   owner: string
   name: string
   type: string
   size: number
   expirationAt: Date
   createdAt: Date
   updatedAt: Date
}

interface StorageDetails {
   tierLabel: string
   storageUsed: number
   storageUsedPercentage: number
   hasReachedCapacity: boolean
   storageCapacity: number
   fileCount: number
   maxUploadSize: number
   maxFileLifespan: string
}

interface PresignedPostURL {
   url: string
   dummyRecord: FileRecord
   fields: Record<string, string>
   maxUploadSize: number
   expirationDate: string
   issueDate: string
}

interface PresignedGetURL {
   url: string
   expirationDate: string
   issueDate: string
}

interface ShortenedURL {
   shortUrl: string
   expiration: string
   lifespan: string
}
